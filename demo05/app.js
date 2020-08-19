const http = require('http')
const url = require('url')
const routes = require('./module/routes.js')
const ejs = require('ejs')
// common.getFileMine('.html')
http.createServer((req, res) => {
  routes.static(req, res, 'static')
  let pathname = url.parse(req.url).pathname.replace("/", "")
  console.log(pathname)
  try {
    routes[pathname](req, res)
  } catch (error) {
    routes['error'](req, res)
  }
}).listen(8000)