let G = {}
let app = function (req, res) {
    let pathname = url.parse(req.url).pathname
    if (G[pathname]) {
      G[pathname](req,res)
    }
}
// 注册方法
app.get = function (string, cb) { // string = /login   cb= (req, res) => {}
    G[string] = cb
}
// 执行方法
app.get('/login', (req, res) => {
    console.log('执行了login方法')
})

module.exports = app
