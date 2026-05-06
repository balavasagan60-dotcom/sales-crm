import { c as createLucideIcon, j as jsxRuntimeExports, h as cn } from "./index-Dycem9-F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const accentBar = {
  primary: "bg-primary",
  accent: "bg-accent",
  destructive: "bg-destructive",
  success: "bg-[oklch(0.62_0.18_150)]"
};
function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent = "primary",
  className,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": dataOcid,
      className: cn(
        "relative bg-card border border-border rounded-lg p-4 flex flex-col gap-2 overflow-hidden transition-smooth hover:shadow-md-elevated group",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "absolute bottom-0 left-0 right-0 h-0.5",
              accentBar[accent]
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display", children: title }),
          Icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold tracking-tight font-display text-foreground", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: subtitle }),
          trend && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "text-xs font-medium",
                trend.positive ? "text-[oklch(0.75_0.18_150)]" : "text-destructive"
              ),
              children: [
                trend.positive ? "+" : "",
                trend.value,
                "%"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  KPICard as K,
  TrendingUp as T
};
