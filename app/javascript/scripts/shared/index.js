const nav = document.getElementById('nav')


window.addEventListener('scroll', (e) => {
  if(window.scrollY > 10) {
    nav.classList.add('bg-white')
    nav.classList.add('text-gray-700')
  } else {
    nav.classList.remove('bg-white')
    nav.classList.remove('text-gray-700')
  }
})