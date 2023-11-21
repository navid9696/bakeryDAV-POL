const navBtn = document.querySelector('.hamburger')
const navBar = document.querySelector('.nav')
const nav = document.querySelector('.nav__list')
const overlay = document.querySelector('.overlay')
const links = document.querySelectorAll('.nav__item')
const blockScroll = document.body
const footerYear = document.querySelector('.footer__year')
const contactForm = document.querySelector('#contact-form')
const nameForm = document.querySelector('#name')
const emailForm = document.querySelector('#email')
const msgForm = document.querySelector('#msg')
const btnForm = document.querySelector('.contact-form__input-btn')
const popup = document.querySelector('.form__popup')
const popupBtn = document.querySelector('.form__popup-close')
const sections = document.querySelectorAll('section')
const header = document.querySelector('header')
const headerBtn = document.querySelector('.header__btn-link')
const headerArrowDown = document.querySelector('.header__arrow-link')
const cookiePopup = document.querySelector('.cookie-popup')
const cookieAccept = document.querySelector('.cookie-popup__btn')

const navbarHeight = navBar.clientHeight
const scrollThreshold = 200

overlay.style.visibility = 'hidden'

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

const closeOverlay = () => {
	handleOverlay()
	navBtn.classList.remove('is-active')
	nav.classList.remove('nav__list--active')
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
	nav.classList.toggle('nav__list--active')
	handleOverlay()
	blockScroll.classList.toggle('block-scroll')
}

const navBarOpacity = () =>
	window.scrollY >= scrollThreshold ? navBar.classList.add('nav__opacity') : navBar.classList.remove('nav__opacity')

const checkCookies = () => {
	const cookies = localStorage.getItem('cookies')
	cookies ? cookiePopup.classList.add('close-popup') : false
}

const cookiePopupClose = e => {
	e.preventDefault()
	localStorage.setItem('cookies', 'true')
	cookiePopup.classList.add('close-popup')
}

handleCurrentYear()
checkCookies()
window.addEventListener('scroll', navBarOpacity)
navBtn.addEventListener('click', handleNav)
cookieAccept.addEventListener('click', cookiePopupClose)
links.forEach(link => {
	link.addEventListener('click', e => {
		navBtn.classList.contains('is-active') ? closeOverlay() : false
	})
})
