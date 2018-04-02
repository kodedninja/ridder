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
			<a href="${state.link}" class="bb db 1 p1" target="_blank">
				<a href="${state.source.url}">${state.source.title}</a> |
				<span>${state.title}</span> | 
				<span class="tcgrey">${state.description}</span>
			</a>
		`
	}
}
