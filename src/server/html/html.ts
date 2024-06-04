export default ({ styles, children, extractor, envVars }: any) => {
  return `<!doctype html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
    ${styles}
    ${extractor.getStyleTags()}
    <script>window.env = ${envVars};</script>
  </head>
  <body>
    <div id="root">${children}</div>
    ${extractor.getScriptTags()}
  </body>
</html>`;
};
