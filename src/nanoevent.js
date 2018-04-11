module.exports = function (el, e, handler) {
	el.removeEventListener(e, handler)
	el.addEventListener(e, handler)
	
	return el
}
