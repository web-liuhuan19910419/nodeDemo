let G = {}
let app = function (req, res) {
    if (G['/login']) {
      G['/login'](req,res)  
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

setTimeout (() => {app('req', 'res')}, 1000)