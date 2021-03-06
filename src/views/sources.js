const html = require('nanohtml')
const autofocus = require('dom-autofocus')
const nanoevent = require('../nanoevent')
const wrapper = require('../components/wrapper')

const Input = require('../components/input')
const new_source = new Input('URL of feed...')

module.exports = wrapper(view)

function view (state, emit) {
	return html`
		<div class="1 p2 fl db">
			<div class="1 ofh mb2 p0-5">
				<div class="5/6 dib fl">
					${autofocus(nanoevent(new_source.render(state, emit, 2), 'keydown', ns_keydown))}
				</div>
				<div class="1/6 dib fl">
					<a href="#" class="nbb f2 db tac fwn" onclick="${add}">+ Add</a>
				</div>
			</div>

			${state.ridder.sources.map(source)}
		</div>
	`

	function source(state) {
		return html`
			<div class="1 ofh mb1 p0-5 source">
				<div class="f2 fwn lh1 remove dib fl">
					<a class="nbb" href="#" onclick="${remove}">x</a>
				</div>
				<div class="1 dib fl lh1 link">
					<a href="${state}" class="nbb wwbw f2 fwn" target="_blank">${state}</a>
				</div>
			</div>
		`

		function remove(e) {
			e.preventDefault()

			emit('ridder:source:remove', state)
		}
	}

	function add(e) {
		e.preventDefault()

		var url = new_source.element.value.trim()
		if (url != '') {
			if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1 && url.indexOf('dat://') == -1) return
			emit('ridder:source:add', url)
			new_source.element.value = ''
		}
	}

	function ns_keydown(e) {
		if (e.keyCode == 13) add(e)
	}
}
