const navBtn = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')
const links = document.querySelectorAll('.nav__item')
const blockScroll = document.body

const overlayVisibility = (overlay.style.visibility = 'hidden')

const closeOverlay = () => {
	handleOverlay()
	navBtn.classList.remove('is-active')
	nav.classList.remove('nav--active')
	blockScroll.classList.remove('block-scroll')
}

const handleOverlay = () => {
	if (overlay.style.visibility == 'hidden') {
		overlay.style.visibility = 'visible'
		setTimeout(function () {
			overlay.classList.add('active')
		}, 1)
	} else {
		setTimeout(function () {
			overlay.style.visibility = 'hidden'
		}, 300)
		overlay.classList.remove('active')
	}
}

const handleNav = () => {
	navBtn.classList.toggle('is-active')
	nav.classList.toggle('nav--active')
	handleOverlay()
	blockScroll.classList.toggle('block-scroll')
}

navBtn.addEventListener('click', handleNav)
window.addEventListener('click', e => (e.target === overlay ? closeOverlay() : false))
links.forEach(link => {
	link.addEventListener('click', closeOverlay)
})
