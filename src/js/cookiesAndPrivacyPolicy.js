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
const hamburgerStyle = window.getComputedStyle(document.querySelector('.hamburger'))
const svgNavIcon = document.querySelector('.svg-icon')

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
	const myCookie = getCookie('myCookie')

	if (myCookie === 'true') {
		cookiePopup.classList.add('close-popup')
	} else {
		navBtn.setAttribute('disabled', 'true')
		overlay.style.visibility = 'visible'
		setTimeout(function () {
			overlay.classList.add('active')
		}, 1)
		blockScroll.classList.add('block-scroll')
	}
}

const getCookie = cookieName => {
	const name = cookieName + '='
	const decodedCookie = decodeURIComponent(document.cookie)
	const cookieArray = decodedCookie.split(';')

	for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i]
		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1)
		}
		if (cookie.indexOf(name) === 0) {
			return cookie.substring(name.length, cookie.length)
		}
	}
	return ''
}

const setCookie = (cookieName, cookieValue, expirationDays) => {
	const d = new Date()
	d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000)
	const expires = 'expires=' + d.toUTCString()
	const sameSite = 'SameSite=None; Secure'
	document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/;' + sameSite
}

const cookiePopupClose = e => {
	e.preventDefault()
	setCookie('myCookie', 'true', 30)
	cookiePopup.classList.add('close-popup')
	closeOverlay()
}

checkCookies()

const homeHandleColor = () => {
	hamburgerStyle.getPropertyValue('display') === 'none'
		? svgNavIcon.setAttribute('fill', '#000000')
		: svgNavIcon.setAttribute('fill', '#ffffff')
}

homeHandleColor()
handleCurrentYear()
checkCookies()
window.addEventListener('scroll', navBarOpacity)
navBtn.addEventListener('click', handleNav)
cookieAccept.addEventListener('click', e => {
	cookiePopupClose(e)
	navBtn.removeAttribute('disabled')
})
links.forEach(link => {
	link.addEventListener('click', e => {
		navBtn.classList.contains('is-active') ? closeOverlay() : false
	})
})
