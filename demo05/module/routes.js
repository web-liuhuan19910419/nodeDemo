const fs = require('fs')
const url = require('url')
const path = require('path')
const ejs = require('ejs')
const getFileMine = function (extName) { // 自己封装的异步方法
  return new Promise((resolve, reject) => {
    fs.readFile('./data/mine.json', (err, data) => {
        if (err) {
            console.log('读取文件失败')
            reject(err)
            return
        }
        let mine = JSON.parse(data.toString())
        resolve(mine[extName])
    })
  })
}
const getFileMineSync = function (extName) { // nodejs自带的同步读取文件的方法
    let data = fs.readFileSync('./data/mine.json')
    let mineObj = JSON.parse(data.toString())
    return mineObj[extName]
}

// 封装路由方法，根据不同的路由处理不同的业务
let app = {
  static: (req, res, staticPath) => {
    // 处理静态路由的方法
  let pathName= url.parse(req.url).pathname
  pathName= pathName == '/' ? '/index.html' : pathName
  let extName = path.extname(pathName)
  console.log(extName)
  if (pathName !== '/favicon.ico') { // 过滤掉无用的请求
    try {
      let data = fs.readFileSync('./' + staticPath + pathName)
      if (data) {
        let mine = getFileMineSync(extName)
        res.writeHead(200, {'Content-type': '' + mine + ';charset="utf-8"'})
        res.end(data)
      }
    } catch (error) {
    }
  }
  },
  login: (req,res) => {
    // 进入到登录页面
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
  },
  login1: (req, res) => {
    ejs.renderFile('./views/form.ejs', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
      res.end(data)
    })
  },
  news: (req, res) => {
    // 处理news的业务逻辑
    res.end('news')
  },
  doLogin: (req, res) => {
    // 处理点击登录之后的逻辑
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk
    })
    req.on('end', () => {
      res.end(postData)
    })
  },
  error: (req, res) => {
    // 处理错误逻辑
    res.end('error')
  }
}

module.exports = app