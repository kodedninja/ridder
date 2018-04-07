const Nanocomponent = require('nanocomponent')
const html = require('nanohtml')

module.exports = class Input extends Nanocomponent {
	constructor(placeholder, value) {
		super()

		this.placeholder = placeholder
		this.value = value || ''
	}

	createElement(state, emit, size) {
		return html`
			<input type="text" placeholder="${this.placeholder}" class="f${size} fwn 1" value="${this.value}">
		`
	}

	update() {
		return false
	}
}
