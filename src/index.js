const choo = require('choo')

const app = choo()

app.use(require('./plugins/pagination'))
app.use(require('./plugins/ridder')())

app.route('/', require('./views/main'))
app.route('/sources', require('./views/sources'))

app.mount('main')
