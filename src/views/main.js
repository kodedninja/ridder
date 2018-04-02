const html = require('nanohtml')
const raw = require('nanohtml/raw')
const wrapper = require('../components/wrapper')

module.exports = wrapper(view)

function view(state, emit) {
	return html`
		<div class="1">
			<div class="dib 1/5 fl pr1 pt1">
				${state.ridder.sources.map(source)}
			</div>
			<div class="dib 4/5 fl">
				${state.ridder.feed
					.filter(pagination)
					.map(item)}
			</div>
		</div>
	`

	function source(state) {
		return html`
			<div class="1 ofh fsmall">
				${state}
			</div>
		`
	}

	function item(state) {
		return html`
			<a href="${state.link}" class="bb db 1 nbb py1" target="_blank">
				<a href="${state.source.url}">${state.source.title}</a> | <span class="fwb">${state.title}</span> | <span class="tcgrey">${clear(state.description)}</span> | <span>${date(state.pubdate)}</span>
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

}
