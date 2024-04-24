export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:9876"
    : import.meta.env.VITE_BASEURL;
