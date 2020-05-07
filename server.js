var http = require('http')
var fs = require('fs')
var path = require('path')

const onRequest = (request, response) => {
  const ruta = `.${(request.url === '/') ? '/index.html' : request.url}`
  const extension = path.extname(ruta)
  let contentType = 'text/html'
  switch (extension) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
  }

  fs.stat(ruta, (err, stat) => {
    if (err === null) {
      fs.readFile(ruta, (bError, content) => {
        if (bError) {
          response.writeHead(500)
          response.end()
        } else {
          response.writeHead(200, { 'content-Type': contentType })
          response.end(content)
        }
      })
    } else {
      response.writeHead(404); response.end()
    }
  })
}
http.createServer(onRequest).listen(8888)
