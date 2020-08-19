const http = require('http')
const fs = require('fs')
const common = require('./module/common.js')
const path = require('path')
const url = require('url')
// common.getFileMine('.html')
http.createServer((req, res) => {
    console.log(req.url)
    console.log(url.parse(req.url))
    let pathName= url.parse(req.url).pathname
    pathName= pathName == '/' ? '/index.html' : pathName
    let extName = path.extname(pathName)
    console.log(extName)
    if (pathName != '/favicon.ico') { // 过滤掉无用的请求
      fs.readFile('./static' + pathName, async (err, data) => {
          if (err) {
              res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'})
              res.end('这个页面不存在')
          }
          let mine = await common.getFileMine(extName)
          console.log(mine)
          res.writeHead(200, {'Content-Type': '' + mine + ';charset="utf-8"'})
          res.end(data)
      })
    }
}).listen(8000)