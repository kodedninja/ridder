const Nanocomponent = require('nanocomponent')
const html = require('nanohtml')

module.exports = class Input extends Nanocomponent {
	constructor(placeholder) {
		super()

		this.placeholder = placeholder
	}

	createElement(state, emit) {
		return html`
			<input type="text" placeholder="${this.placeholder}" class="f2 fwn 1">
		`
	}

	update() {
		return false
	}
}
