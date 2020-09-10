const { tuft, createSearchParams } = require('tuft')

const app = tuft({
  preHandlers: [createSearchParams()]
})

app.onError(console.error)

app.set('GET /search-params', t => {
  const json = {}

  for (const [key, value] of t.request.searchParams) {
    json[key] = value
  }

  return { json }
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
