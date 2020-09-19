const { tuft, createSession } = require('tuft')

const app = tuft({
  preHandlers: [createSession({ name: 'counter' })]
})

app.onError(console.error)

/**
 * The following route implements a simple counter. Each time a client requests the route, the
 * counter is incremented by one.
 */

app.set('GET /session', t => {
  const { counter } = t.request;

  if (counter.n === undefined) {
    counter.n = 0;
  }

  else {
    counter.n++;
  }

  return { json: t.request.counter }
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
