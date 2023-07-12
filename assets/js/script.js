// GET data params from URL
function getParams(url) {
  if (!url.includes("?")) {
    return {};
    
  } else {
    url = url.split("?")[1];

    if (url === '' || !url.includes('=')) {
      return {};
    }

    let items;
    if (url.includes('&')) {
      items = url.split('&');
    } else {
      items = [url];
    }

    let params = {};
    items.forEach(item => {
      let data = item.split('=');
      params[data[0]] = data[1];
    });

    return params;
  }
}

var params = getParams(window.location.href);

// const navigate = (path) => {
// 	fetch(path)
// 		.then((response) => response.text())
// 		.then((content) => {
// 			document.getElementById("content").innerHTML = content;
// 			localStorage.setItem("lastPage", path);
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			document.getElementById("content").innerHTML =
// 				"<h1>Error loading page</h1>";
// 		});
// };

// const materi = (path) => {
// 	fetch(path)
// 		.then((response) => response.text())
// 		.then((materi) => {
// 			document.getElementById("materi").innerHTML = materi;
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			document.getElementById("materi").innerHTML =
// 				"<h1>Error loading page</h1>";
// 		});
// };

// document.addEventListener("DOMContentLoaded", () => {
// 	const lastPage = localStorage.getItem("lastPage");
// 	const defaultPath = lastPage || "home/index.html";
// 	navigate(defaultPath);
// });
