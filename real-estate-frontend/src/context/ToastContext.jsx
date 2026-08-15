import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext(null);

const styles = {
  success: {
    border: "border-emerald-200",
    bg: "bg-white",
    accent: "bg-emerald-500",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  error: {
    border: "border-rose-200",
    bg: "bg-white",
    accent: "bg-rose-500",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    ),
  },
  info: {
    border: "border-blue-200",
    bg: "bg-white",
    accent: "bg-blue-600",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((items) => items.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((items) => [...items.slice(-4), { id, message, type }]);
    window.setTimeout(() => dismiss(id), 3600);
  }, [dismiss]);

  const value = {
    toast,
    success: (message) => toast(message, "success"),
    error: (message) => toast(message, "error"),
    info: (message) => toast(message, "info"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed top-4 left-1/2 z-[9999] flex w-[min(92vw,400px)] -translate-x-1/2 flex-col gap-2 px-2 sm:top-6 sm:left-auto sm:right-6 sm:translate-x-0 sm:px-0">
        <AnimatePresence>
          {toasts.map((item) => {
            const look = styles[item.type] || styles.info;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -18, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className={`pointer-events-auto flex items-center gap-3 overflow-hidden rounded-2xl border ${look.border} ${look.bg} px-3 py-3 shadow-[0_12px_40px_rgba(15,23,42,0.14)]`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${look.accent}`}>
                  {look.icon}
                </span>
                <p className="flex-1 text-sm font-medium leading-snug text-slate-800">{item.message}</p>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Dismiss notification"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toast: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
    };
  }
  return ctx;
}
