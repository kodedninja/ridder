module.exports = (state, emitter) => {
	state.scroll = 0
	emitter.on('navigate', () => {
		document.body.scrollTop = state.scroll
		state.scroll = 0
	})
}
