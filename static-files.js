const { tuft } = require('tuft')

const app = tuft().onError(console.error)

app.static('/', __dirname)
  .then(async () => {
    const server = app.createServer({
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 3000
    })
    await server.start()
    console.log(`Server listening at http://${server.host}:${server.port}`)
  })
