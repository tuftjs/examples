const { tuft } = require('tuft')

const app = tuft().onError(console.error)

app.set('GET /foo/bar/baz', {
  text: '/foo/bar/baz'
})

app.set('GET /foo/{*}/baz', {
  text: '/foo/{*}/baz'
})

app.set('GET /foo/{**}', {
  text: '/foo/{**}'
})

app.set('GET /foo/{bar}', t => {
  return {
    text: t.request.params.bar
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
