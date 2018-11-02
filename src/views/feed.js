const html = require('nanohtml')
const raw = require('nanohtml/raw')
const wrapper = require('../components/wrapper')
const Loader = require('bytespin')

const loader = Loader({chars: '.oO0', speed: 130})

module.exports = wrapper(view)

function view(state, emit) {
	return html`
		<div class="1 p2 fl">
			<div class="dib 1 fl">
				${state.ridder.loaded_sources < state.ridder.sources.length ? html`<div class="tac f4 fwn">Fetching ${loader.render(true)}</div>` : ''}
				<div class="1 fl">
					${state.ridder.feed
						.filter(pagination)
						.map(item)}
				</div>
				<div class="1 py1 fl">
					<a href="#" class="fl nbb f3" onclick="${prev_page}">${state.page > 0 ? '← Back' : ''}</a>
					<a href="#" class="fr nbb f3" onclick="${next_page}">${state.page < state.pages - 1 ? 'Next →' : ''}</a>
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

	function item(state, id) {
		return html`
			<a href="${state.link}" class="db 1 nbb py1 feeditem closed" target="_blank">
				<a href="${state.source.url}">${state.source.title}</a> | <span>${date(state.pubdate)}</span>
					<span class="dib ml2 fsmall">
						<a href="#" onclick="${read}">Read</a>
					</span>
				<span class="fwb f1 db">${state.title}</span>
				<span class="tcgrey description db" onclick="${click}">${clear(state.description)}</span>
			</a>
		`

		function click(e) {
			e.preventDefault()
			this.parentNode.classList.toggle('closed')
		}

		function read(e) {
			e.preventDefault()
			emit('ridder:read', state.link, document.body.scrollTop)
		}

		function clear(text) {
			return raw(text.replace(/\<.*?>/g,''))
		}

		function date(string) {
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
			var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

			var d = new Date(string)
			return days[d.getDay()] + ', ' + d.getDate() + '. ' + months[d.getMonth()] + ' ' + d.getFullYear() + '.'
		}
	}

	function pagination(_, id) {
		return id >= state.page * state.ridder.config.itemsPerPage &&
			id < (state.page + 1) * state.ridder.config.itemsPerPage
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
