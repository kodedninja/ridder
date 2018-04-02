const choo = require('choo')

const app = choo()

app.use(require('./ridder')())

app.route('/', require('./views/main'))

app.mount('main')
