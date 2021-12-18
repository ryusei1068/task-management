function sanitize(string) {
	return string.replace(/(&|<|>|"|')/g, "").substr(0, 255);
}

module.exports = sanitize
