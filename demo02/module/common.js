const fs = require('fs')
exports.getFileMine = function (extName) { // 自己封装的异步方法
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
exports.getFileMineSync = function (extName) {
    let data = fs.readFileSync('./data/mine.json')
    let mineObj = JSON.parse(data.toString())
    return mineObj[extName]
}