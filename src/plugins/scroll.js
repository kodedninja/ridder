module.exports = (state, emitter) => {
	emitter.on('navigate', () => {
		document.body.scrollTop = 0
	})
}
