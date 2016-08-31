module.exports = line => {
	try {
		const scheme = JSON.parse(line);
		scheme.type = scheme.event;
		return scheme;
	} catch(e) {
	}
};