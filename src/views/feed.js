const html = require('nanohtml')
const raw = require('nanohtml/raw')
const wrapper = require('../components/wrapper')

module.exports = wrapper(view)

function view(state, emit) {
	return html`
		<div class="1 p2 fl">
			<div class="dib 1 fl">
				<div class="1 fl">
					${state.ridder.feed
						.filter(pagination)
						.map(item)}
				</div>
				<div class="1 py1 fl">
					<a href="#" class="fl nbb" onclick="${prev_page}">${state.page > 0 ? '← Back' : ''}</a>
					<a href="#" class="fr nbb" onclick="${next_page}">${state.page < state.pages - 1 ? 'Next →' : ''}</a>
				</div>
			</div>
		</div>
	`

	function source(state) {
		return html`
			<div class="1 ofh fsmall mb0-5">
				<a href="${state}" class="nbb" target="_blank">${state}</a>
			</div>
		`
	}

	function item(state) {
		return html`
			<a href="${state.link}" class="bb db 1 nbb py1" target="_blank">
				<a href="${state.source.url}">${state.source.title}</a><span>${' | '}</span>
				<span class="fwb">${state.title}</span><span>${state.title ? ' | ' : ''}</span>
				<span class="tcgrey">${clear(state.description)}</span><span>${state.description ? ' | ' : ''}</span>
				<span>${date(state.pubdate)}</span>
			</a>
		`

		function clear(text) {
			return raw(text.replace(/\<.*?>/g,''))
		}

		function date(string) {
			var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
			var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December']

			var d = new Date(string)
			return days[d.getDay()] + ', ' + d.getDate() + '. ' + months[d.getMonth()] + ' ' + d.getFullYear() + '.'
		}
	}

	function pagination(_, id) {
		return id > state.page * state.ridder.config.itemsPerPage &&
			id <= (state.page + 1) * state.ridder.config.itemsPerPage
	}

	function next_page(e) {
		e.preventDefault()
		emit('page:move', 1)
	}

	function prev_page(e) {
		e.preventDefault()
		emit('page:move', -1)
	}
}
