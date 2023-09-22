const navBtn = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')
const logo = document.querySelector('.logo')
const blockScroll = document.body

const handleNav = () => {
	navBtn.classList.toggle('is-active')
	nav.classList.toggle('nav--active')
	overlay.classList.toggle('active')
	blockScroll.classList.toggle('block-scroll')
	logo.classList.toggle('fade')
}

navBtn.addEventListener('click', handleNav)
