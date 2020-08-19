const http = require('http')
const url = require('url')
const routes = require('./module/routes.js')
const ejs = require('ejs')
// common.getFileMine('.html')
http.createServer((req, res) => {
  // 创建静态服务器
  let pathName =url.parse(req.url).pathname
  console.log('aaa' + pathName)
  console.log(req.method)
  routes.static(req, res, 'static') // 先读取静态路由
  if (pathName == '/login') { // 动态路由
    let msg = '这是数据库绑定的数据'
    let list = [
      {title: '1111'},
      {title: '2222'},
      {title: '3333'}
    ]
    ejs.renderFile('./views/login.ejs', {msg: msg, list: list}, (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
      res.end(data)
    })
  } else if (pathName == '/login1') {
    ejs.renderFile('./views/form.ejs', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
      res.end(data)
    })
  } else if (pathName == '/doLogin') { // 处理登录动作
    console.log('进来dologin页面')
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk
    })
    req.on('end', () => {
      res.end(postData)
    })
  }
  else if (pathName == '/news') {
    let query = url.parse(req.url).query
    console.log(query)
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
    res.end(query)
  } 
  else if(pathName == '/register') {
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
    res.end('register')
  } else {
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
    res.end('页面不存在')
  }
  console.log(pathName)
  
}).listen(8000)