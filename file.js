const { tuft } = require('tuft')

const app = tuft().onError(console.error)

app.set('GET /file', () => {
  return {
    file: __filename
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
