const { tuft } = require('tuft')

const app = tuft().onError(console.error)

app.set('GET /200', () => {
  return {
    status: 200
  }
})

app.set('GET /400', () => {
  return {
    status: 400
  }
})

app.set('GET /500', () => {
  return {
    status: 500
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
