const navBtn = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')


const handleNav = () => {
	navBtn.classList.toggle('is-active')
	nav.classList.toggle('nav--active')
}

navBtn.addEventListener('click', handleNav)



