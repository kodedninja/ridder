const Nanocomponent = require('nanocomponent')
const html = require('nanohtml')

module.exports = class Updatebutton extends Nanocomponent {
	constructor() {
		super()

		this.show = true
	}

	createElement (emit) {
		const t = this
		setTimeout(function() {
			t.show = !t.show
			if (t.element) t.rerender()
			else clearTimeout(this)
		}, 750)

		return html`
			<a class="pa t0 mr1 nbb" style="color: #E87EA1; transform: rotate(-40deg); right: 0;" href="#" onclick="${click}">${this.show ? 'UPDATE!' : ''}</a>
		`

		function click(e) {
			e.preventDefault()

			emit('updater:update')
		}
	}

	update() {
		return false
	}
}
