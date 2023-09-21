const nav = document.getElementById('nav')

window.addEventListener('scroll', (e) => {
  if(window.scrollY > 20) {
    nav.classList.add('bg-white')
    nav.classList.add('text-black')
  } else {
    nav.classList.remove('bg-white')
    nav.classList.remove('text-black')
  }
})