import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  rowClassName?: (row: T) => string;
  onRowClick?: (row: T) => void;
  "data-ocid"?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading,
  emptyMessage = "No data found",
  className,
  rowClassName,
  onRowClick,
  "data-ocid": dataOcid,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(
        sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc",
      );
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div
      data-ocid={dataOcid}
      className={cn("w-full overflow-x-auto", className)}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display whitespace-nowrap",
                  col.sortable &&
                    "cursor-pointer select-none hover:text-foreground transition-colors",
                  col.className,
                )}
                onClick={() => col.sortable && handleSort(col.key)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  col.sortable &&
                  handleSort(col.key)
                }
                tabIndex={col.sortable ? 0 : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span className="flex flex-col">
                      <ChevronUp
                        className={cn(
                          "w-2.5 h-2.5 -mb-0.5",
                          sortKey === col.key && sortDir === "asc"
                            ? "text-primary"
                            : "opacity-30",
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "w-2.5 h-2.5 -mt-0.5",
                          sortKey === col.key && sortDir === "desc"
                            ? "text-primary"
                            : "opacity-30",
                        )}
                      />
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            [0, 1, 2, 3, 4].map((i) => (
              <tr key={`skeleton-${i}`} className="border-b border-border/50">
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2.5">
                    <div className="h-3.5 bg-muted animate-pulse rounded" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-12 text-center text-muted-foreground text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={keyExtractor(row)}
                data-ocid={dataOcid ? `${dataOcid}.row.${idx + 1}` : undefined}
                className={cn(
                  "border-b border-border/50 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-muted/40",
                  rowClassName?.(row),
                )}
                onClick={() => onRowClick?.(row)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && onRowClick?.(row)
                }
                tabIndex={onRowClick ? 0 : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("px-3 py-2.5", col.className)}
                  >
                    {col.render(row, idx)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
