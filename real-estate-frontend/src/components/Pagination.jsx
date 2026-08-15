function buildPages(current, total) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const items = [];

  sorted.forEach((num, index) => {
    if (index > 0 && num - sorted[index - 1] > 1) {
      items.push("ellipsis-" + sorted[index - 1]);
    }
    items.push(num);
  });

  return items;
}

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const items = buildPages(page, totalPages);
  const btnBase =
    "h-10 min-w-10 rounded-xl border text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30";

  const go = (next) => {
    onPageChange(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className="mt-12 flex w-full flex-col items-center gap-3 sm:mt-16"
      aria-label="Pagination"
    >
      <p className="text-xs font-semibold tracking-wide text-slate-500 sm:hidden">
        Page {page} of {totalPages}
      </p>

      <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-1.5 px-1 sm:gap-2">
        <button
          type="button"
          onClick={() => go(Math.max(page - 1, 1))}
          disabled={page === 1}
          className={`${btnBase} flex items-center justify-center bg-white px-3 text-slate-500 hover:border-blue-300 hover:text-blue-600`}
          aria-label="Previous page"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="ml-1 hidden text-xs font-semibold sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1.5 sm:hidden">
          <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-3 text-sm font-bold text-white shadow-lg">
            {page}
          </span>
        </div>

        <div className="hidden items-center gap-1.5 sm:flex">
          {items.map((item) =>
            typeof item === "string" ? (
              <span key={item} className="px-1 text-sm font-bold text-slate-400">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => go(item)}
                className={`${btnBase} px-3 ${
                  page === item
                    ? "border-transparent text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
                style={
                  page === item
                    ? {
                        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                        boxShadow: "0 6px 20px rgba(37,99,235,0.3)",
                      }
                    : undefined
                }
                aria-current={page === item ? "page" : undefined}
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => go(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className={`${btnBase} flex items-center justify-center bg-white px-3 text-slate-500 hover:border-blue-300 hover:text-blue-600`}
          aria-label="Next page"
        >
          <span className="mr-1 hidden text-xs font-semibold sm:inline">Next</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
