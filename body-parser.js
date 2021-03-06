const { tuft, createBodyParser } = require('tuft')

const app = tuft({
  preHandlers: [
    createBodyParser('raw'),
    createBodyParser('text'),
    createBodyParser('json'),
    createBodyParser('urlEncoded')
  ]
})

app.onError(console.error)

app.set('POST /body-parser', t => {
  const { body } = t.request

  console.log(t.request.headers);

  if (typeof body === 'string') {
    return {
      text: t.request.body
    }
  }

  if (Buffer.isBuffer(body)) {
    return {
      raw: t.request.body
    }
  }

  if (typeof body === 'object' && body !== null) {
    return {
      json: t.request.body
    }
  }

  return {
    status: 400,
    text: 'No body was detected in the request message.'
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
