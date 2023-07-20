function init() {
  const buttons = document.querySelectorAll('.isi-subbab a.nav-subbab');

  function update_subbab(bab, sub) {
    // Update bab content
    fetch(bab + '/' + sub + '.html')
      .then((response) => {
        if (!response.ok) throw Error(response.statusText); 
        return response.text();
      })
      .then((materi) => {
        document.getElementById("subbab").innerHTML = materi;
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("subbab").innerHTML = "<h1>Error loading page</h1>";
      })
      .finally(() => {
        // Update nav
        buttons.forEach(button => {button.classList.remove('active')});
        buttons[parseInt(sub) - 1].classList.add('active');
      })
  };

  // Buttons Link Event
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      // get href value
      let url = e.target.getAttribute('href');
      window.history.pushState(null, "materi", url); // pushstate biar bisa di-undo
      // update content
      let params = getParams(url);
      update_subbab(params.bab, params.sub);
      // close the nav (mobile)
      document.querySelector("#materi nav").classList.remove("active");
      // scroll to subbab
      document.getElementById("subbab").scrollIntoView();
    })
  });

  // Button Nav Event (Mobile)
  document.querySelector("#materi .nav-button").addEventListener('click', () => {
    document.querySelector("#materi nav").classList.toggle("active");
  })

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
      init();
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("content").innerHTML = "<h1>Error loading page</h1>";
    });
});