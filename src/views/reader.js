const html = require('nanohtml')
const raw = require('nanohtml/raw')
const wrapper = require('../components/wrapper')

module.exports = wrapper(view)

function view(state, emit) {

	if (!state.ridder.reader.loaded) return html`<div class="loading"></div>`

	return html`
		<div class="p2 fl db 1">
			<div class="f2 tac mb1">${state.ridder.reader.current.title}</div>
			<div class="db 2/3 m-1 mxa">
				${raw(state.ridder.reader.current.content)}
			</div>
		</div>
	`
}
