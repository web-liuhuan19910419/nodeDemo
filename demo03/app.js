const http = require('http')
const url = require('url')
const routes = require('./module/routes.js')
// common.getFileMine('.html')
http.createServer((req, res) => {
  // 创建静态服务
  let pathName =url.parse(req.url).pathname
  console.log('aaa' + pathName)
  routes.static(req, res, 'static') // 先读取静态路由
  if (pathName == '/login') { // 动态路由
    console.log('处理login业务')
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
    res.end('login')
  } else if(pathName == '/register') {
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
    res.end('register')
  } else {
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
    res.end('页面不存在')
  }
  console.log(pathName)
  
}).listen(8000)