const { tuft, createCookieParser } = require('tuft')

const app = tuft({
  preHandlers: [createCookieParser()]
})

app.onError(console.error)

app.set('GET /cookie-parser', t => {
  return {
    json: t.request.cookies
  }
})

const server = app.createServer({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
})

server
  .start()
  .then(() => {
    console.log(`Server listening at http://${server.host}:${server.port}`)
  })
