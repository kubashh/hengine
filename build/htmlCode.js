function htmlCode() {
  return codeOptimalize(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="author" content="${config.author}">
      <meta name="description" content="${config.description}">
      <meta name="keywords" content="${config.gameName}, ${config.author}">
      <title>${config.gameName}</title>

      <style>
        body {
          background-color:black;
          margin:0;
          border:0;
          padding:0;
          width:100%;
          height:100%;
        }
        canvas { display:block; }
      </style>
    </head>
    <body>
      <canvas id="gameCanvas" width="${config.screenWidth}" height="${
    config.screenHeight
  }"></canvas>

      <script>
        ${jsCode()}
      </script>
    </body>
    </html>
  `)
}
