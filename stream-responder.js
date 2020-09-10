const { tuft, createWriteStreamResponder } = require('tuft')

const app = tuft({
  responders: [createWriteStreamResponder()]
})

app.onError(console.error)

app.set('GET /write-stream', () => {
  return {
    writeStream: write => {
      write('Hello, ')
      write('world!\n')
    }
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
