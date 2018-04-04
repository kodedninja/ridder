const html = require('nanohtml')
const wrapper = require('../components/wrapper')

const Input = require('../components/input')
const new_source = new Input('Source URL')

module.exports = wrapper(view)

function view (state, emit) {
	return html`
		<div class="1 db">
			<div class="db tac mb1">Manage Sources</div>
			<div>
				<div class="1 ofh mb0-5 bb p0-5">
					<div class="4/5 dib fl">
						${new_source.render(state, emit)}
					</div>
					<div class="1/5 dib fl">
						<a href="#" onclick="${add}">Add</a>
					</div>
				</div>
				${state.ridder.sources.map(source)}
			</div>
		</div>
	`

	function source(state) {
		return html`
			<div class="1 ofh mb0-5 bb p0-5">
				<div class="1/2 dib fl">
					<a href="${state}" class="nbb wwbw f4" target="_blank">${state}</a>
				</div>
				<div class="1/2 dib fl">
					<a href="#" class="fr" onclick="${remove}">Remove</a>
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

		if (new_source.element.value.trim() != '') {
			emit('ridder:source:add', new_source.element.value.trim())
			new_source.element.value = ''
		}
	}
}
