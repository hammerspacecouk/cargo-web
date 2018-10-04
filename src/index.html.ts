import Assets from "./Utils/Assets";

export default (
  config: object,
  assets: Assets,
  content: any,
  data?: any,
  title: string = null
) => `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title ? `${title} | ` : ""}Planet Cargo</title>
    <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding" rel="stylesheet">
    <link rel="stylesheet" href="${assets.get("app.css")}" />
</head>
<body>
<div id="root">${content}</div>
<script src="${assets.get("vendor.js")}"></script>
<script>
  window._CONFIG_ = ${JSON.stringify(config)};
  window._INITIAL_DATA_ = ${JSON.stringify(data)};

  const supportsES6 = function() {
    try {
      new Function("(a = 0) => a");
      return true;
    } catch (e) {
      return false;
    }
  }();
  if (supportsES6) {
    let script = document.createElement('script');
    script.src = '${assets.get("app.js")}';
    document.head.appendChild(script);
  }
</script>
</body>
</html>
`;
