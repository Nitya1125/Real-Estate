export const API_BASE =
  import.meta.env.VITE_API_URL || "https://real-estate-dhap.onrender.com";

export const apiUrl = (path = "") =>
  `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

export const uploadsUrl = (filename) => {
  if (!filename) return "";
  if (String(filename).startsWith("http")) return filename;
  return `${API_BASE}/uploads/${filename}`;
};
