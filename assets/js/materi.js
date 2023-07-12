function update_subbab(bab, sub) {
  // Update bab content
	fetch(bab + '/' + sub + '.html')
		.then((response) => response.text())
		.then((materi) => {
			document.getElementById("materi").innerHTML = materi;
		})
		.catch((error) => {
			console.error(error);
			document.getElementById("materi").innerHTML = "<h1>Error loading page</h1>";
		});
};

function initialization() {
  const buttons = document.querySelectorAll('.isi-subbab a.nav-subbab');

  // Buttons Event
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      // get href value
      let url = e.target.getAttribute('href');
      window.history.pushState(null, "materi", url); // pushstate biar bisa di-undo
      // update content
      let params = getParams(url);
      update_subbab(params.bab, params.sub);
    })
  });

  // Undo Event
  window.addEventListener('popstate', () => {
    let params = getParams(window.location.href);
    update_subbab(params.bab, params.sub);
  });

  update_subbab(params.bab, params.sub);
}

window.addEventListener('DOMContentLoaded', () => {
  fetch(params.bab + '/nav.html')
    .then((response) => {
      if (!response.ok) throw Error(response.statusText); 
      return response.text();
    })
    .then((nav) => {
      document.getElementById("content").innerHTML = nav;
      initialization();
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("content").innerHTML = "<h1>Error loading page</h1>";
    });
});