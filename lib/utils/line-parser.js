module.exports = line => {
	try {
		const scheme = JSON.parse(line);
		scheme.type = 'message';
		return scheme;
	} catch(e) {
	}
};