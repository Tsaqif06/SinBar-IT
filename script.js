const kelas = (path) => {
	fetch(path)
		.then((response) => response.text())
		.then((bab) => {
			document.getElementById("bab").innerHTML = bab;
		})
		.catch((error) => {
			console.error(error);
			document.getElementById("bab").innerHTML = "<h1>Error loading page</h1>";
		});
};
const navigate = (path) => {
	fetch(path)
		.then((response) => response.text())
		.then((content) => {
			document.getElementById("content").innerHTML = content;
			localStorage.setItem("lastPage", path);
		})
		.catch((error) => {
			console.error(error);
			document.getElementById("content").innerHTML =
				"<h1>Error loading page</h1>";
		});
};

document.addEventListener("DOMContentLoaded", () => {
	const lastPage = localStorage.getItem("lastPage");
	const defaultPath = lastPage || "home/index.html";
	navigate(defaultPath);
});
