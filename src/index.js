const choo = require('choo')

const app = choo()

app.use(require('./plugins/pagination'))
app.use(require('./plugins/ridder')())

app.route('/', require('./views/feed'))
app.route('/sources', require('./views/sources'))
app.route('/settings', require('./views/settings'))

app.mount('main')
