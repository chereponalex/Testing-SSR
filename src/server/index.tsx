import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import renderer from "@/server/renderer";
import axios from "axios";
import { TOKEN_COOKIE_KEY } from "../client/utils/cookie";
import { config } from "../config";

const app = express();

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const WebpackHotMiddleware = require("webpack-hot-middleware");
  const WebpackDevMiddleware = require("webpack-dev-middleware");
  const webpackConfig = require("../../webpack/dev/webpack.dev.client.js");
  const compiler: any = webpack(webpackConfig);

  app.use(
    WebpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
    })
  );

  app.use(WebpackHotMiddleware(compiler));
}

app.use(compression());
app.use(cookieParser());
app.use(express.static("dist"));
app.use(express.json());

app.use("/proxy*", async (req: express.Request, res: express.Response) => {
  try {
    const response = await axios({
      method: req.method.toLowerCase(),
      url: `${config.BACKEND_URL}${req.originalUrl.slice(6)}`,
      headers: { Authorization: `Bearer ${req.cookies[TOKEN_COOKIE_KEY]}` },
      ...(req.method.toLowerCase() === "post" ||
      req.method.toLowerCase() === "patch"
        ? { data: { ...req.body } }
        : {}),
    });

    res.status(200).json({
      data: response.data,
    });
  } catch (err: any) {
    const errorStatus = err?.response?.status || 500;
    res.status(errorStatus).json({
      status: "Error",
    });
  }
});

app.get("/*", (req: express.Request, res: express.Response) => {
  try {
    res.send(renderer(req));
  } catch (err) {
    console.log("error in rendering server side:", err);
  }
});
const port = parseInt(process.env[["APP_PORT"][0]] ?? "3000", 10);
const host = process.env[["APP_HOST"][0]] || "127.0.0.1";

app.listen(port, host, () => {
  console.log(`Соединение с сервером ${host} прошло успешно PORT: ${port}`);
});
