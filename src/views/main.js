const html = require('nanohtml')
const raw = require('nanohtml/raw')
const wrapper = require('../components/wrapper')

module.exports = wrapper(view)

function view(state, emit) {
	return html`
		<div class="1">
			${state.ridder.feed.map(item)}
		</div>
	`

	function item(state) {
		return html`
			<a href="${state.link}" class="bb db 1 nbb py1" target="_blank">
				<a href="${state.source.url}">${state.source.title}</a> | <span class="fwb">${state.title}</span> | <span class="tcgrey">${clear(state.description)}</span>
			</a>
		`

		function clear(text) {
			return raw(text.replace(/\<.*?>/g,''))
		}
	}
}
