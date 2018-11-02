const choo = require('choo')
const css = require('sheetify')

css('./styles/ff.css')

const app = choo()

app.use(require('./plugins/scroll'))
app.use(require('./plugins/pagination'))
app.use(require('./plugins/updater'))
app.use(require('./plugins/ridder')())

app.route('/', require('./views/feed'))
app.route('/sources', require('./views/sources'))
app.route('/settings', require('./views/settings'))
app.route('/reader', require('./views/reader'))

app.mount('body')
