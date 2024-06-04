let dataSource: any = typeof window === "undefined" ? process : window;

if (!dataSource.env) {
  dataSource = { env: {} };
}

export const config = {
  BACKEND_URL: dataSource.env.BACKEND_URL || "https://dev.api.lidofon.com",
  PROXY_URL: dataSource.env.PROXY_URL || "http://localhost:3000/proxy",
};
