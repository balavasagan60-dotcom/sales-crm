import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, h as cn } from "./index-Dycem9-F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl"
};
function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  className,
  "data-ocid": dataOcid
}) {
  const dialogRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);
  reactExports.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none max-h-none m-0 p-4",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: dialogRef,
            "data-ocid": dataOcid,
            className: cn(
              "relative z-10 w-full bg-card border border-border rounded-xl shadow-md-elevated animate-fade-in",
              sizeMap[size],
              className
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
                title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold font-display text-foreground", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": dataOcid ? `${dataOcid}.close_button` : void 0,
                    onClick: onClose,
                    className: "ml-auto p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                    "aria-label": "Close dialog",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children })
            ]
          }
        )
      ]
    }
  );
}
export {
  Modal as M
};
