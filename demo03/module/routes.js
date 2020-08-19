const fs = require('fs')
const url = require('url')
const path = require('path')
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
const getFileMineSync = function (extName) {
    let data = fs.readFileSync('./data/mine.json')
    let mineObj = JSON.parse(data.toString())
    return mineObj[extName]
}
exports.static = function (req, res, staticPath) { // 静态路由方法
  console.log(req.url)
  console.log(url.parse(req.url))
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
}