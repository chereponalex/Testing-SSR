import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import express from "express";
import serialize from "serialize-javascript";
import getHtml from "./html/html";
import path from "path";
import App from "@/client/App";
import { config } from "../config";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { ServerStyleSheet } from "styled-components";

export default (req: express.Request) => {
  const sheet = new ServerStyleSheet();
  const loadableJson = path.resolve(__dirname, "./loadable-stats.json");

  const extractor = new ChunkExtractor({
    statsFile: loadableJson,
    entrypoints: ["client"],
  });

  const content = renderToString(
    // @ts-ignore
    sheet.collectStyles(
      // @ts-ignore
      <ChunkExtractorManager extractor={extractor}>
        {/* @ts-ignore */}
        <StaticRouter location={req.path} context={{}}>
          {/* @ts-ignore */}
          <App connectionIP={req.socket.remoteAddress || ""} />
        </StaticRouter>
      </ChunkExtractorManager>
    )
  );

  const styles = sheet.getStyleTags();

  const htmlData: any = {
    styles,
    children: content,
    extractor,
    envVars: serialize({ ...config }),
  };

  const html = getHtml(htmlData);

  return html;
};
