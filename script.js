const navigate = (path) => {
	fetch(path)
		.then((response) => response.text())
		.then((content) => {
			document.getElementById("content").innerHTML = content;
		})
		.catch((error) => {
			console.error(error);
			document.getElementById("content").innerHTML =
				"<h1>Error loading page</h1>";
		});
};
