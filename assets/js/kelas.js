const buttons = document.querySelectorAll('.materi a.nav-kelas');

function update_bab(kelas) {
  // Data validation if empty (set to default value)
  kelas = kelas || 'x';
  // Update bab content
	fetch('materi/' + kelas + '.html')
		.then((response) => {
      if (!response.ok) throw Error(response.statusText); 
      return response.text();
    })
		.then((bab) => {
			document.getElementById("bab").innerHTML = bab;
		})
		.catch((error) => {
			console.error(error);
			document.getElementById("bab").innerHTML = "<h1>Error loading page</h1>";
		})
    .finally(() => {
      // Update nav
      buttons.forEach(button => {button.classList.remove('active')});
      switch (kelas) {
        case 'x':
          buttons[0].classList.add('active');
          break;
        case 'xi':
          buttons[1].classList.add('active');
          break;
        case 'xii':
          buttons[2].classList.add('active');
          break;
      }
    });
};

// Buttons Event
buttons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    // get href value
    let url = e.target.getAttribute('href');
    window.history.pushState(null, "materi", url); // pushstate biar bisa di-undo
    // update content
    let kelas = getParams(url)['kelas'];
    update_bab(kelas);
  })
});

// Undo Event
window.addEventListener('popstate', () => {
  let kelas = getParams(window.location.href)['kelas'];
  update_bab(kelas);
});

update_bab(params.kelas);