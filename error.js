window.onerror = function(...args) {
	if (location.hostname === "localhost") {
		fetch(".", {
			method: "post",
			body: args.join("\n")
		}).catch(console.log);
	} else {
		console.warn(...args);
	}
}