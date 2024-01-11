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
const gallery = document.querySelectorAll('.gallery__img-container')
const images = document.querySelectorAll('.gallery__photo')
const fullscreenImages = document.querySelectorAll('.gallery__photo-fullscreen')
const headerLinks = [headerBtn, headerArrowDown]
const sectionsAndHeader = [header, ...sections]
const navbarHeight = navBar.clientHeight
const viewportHeight = window.innerHeight
const scrollThreshold = 200
const rootMarginBottomCorrection = 110
const rootMarginTopCorrection = 10
const rootMarginBottom = `${-(viewportHeight - rootMarginBottomCorrection)}px`
const rootMarginTop = `${-(navbarHeight + rootMarginTopCorrection)}px`
const cardImg = document.querySelectorAll('.about-us__card-img')
const cardInfo = document.querySelectorAll('.about-us__card-info')
const EMAILJS_API_KEY = 'lgkz6CPgh6GbEuCoO'
let correspondingFullscreenLi

overlay.style.visibility = 'hidden'


emailjs.init(`${EMAILJS_API_KEY}`)
let emailValid = 0

const validateEmail = email => {
	const emailReg =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/gim
	if (emailReg.test(email.value) && nameForm.value != '' && msgForm.value != '') {
		removeError(email)
		navBtn.setAttribute('disabled', 'true')
		contactForm.contact_number.value = Math.floor(Math.random() * 100000)
		emailjs
			.sendForm('service_4rabq7e', 'template_6wtj7m3', contactForm)
			.then(() => {
				console.log('SUCCESS!')
			})
			.catch(error => {
				console.log('FAILED...', error)
			})
		emailValid = 1
	} else if (email.value === '') showError(email, email.placeholder)
	else if (emailReg.test(email.value) & (nameForm.value != '' || msgForm.value != '')) removeError(email)
	else if (emailReg.test(email.value) === false) {
		showError(email, 'Email jest nieprawidłowy!')
		emailValid = 0
	}
}

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
	if (overlay.style.visibility === 'hidden') {
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

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.contact-form__error-text')
	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const removeError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact-form__box')
	let errorCount = 0

	allInputs.forEach(el => {
		el.classList.contains('error') ? errorCount++ : false
	})

	if (errorCount === 0 && emailValid === 1) {
		blockScroll.classList.add('block-scroll')
		popup.classList.add('show-popup')
		overlay.style.visibility = 'visible'
		setTimeout(function () {
			overlay.classList.add('active')
		}, 1)
	}
}

const clearInputs = input => {
	input.forEach(el => {
		el.value = ''
		removeError(el)
	})
}

const popupBtnRemoveOverlay = e => {
	e.preventDefault()
	clearInputs([msgForm, nameForm, emailForm])
	blockScroll.classList.remove('block-scroll')
	setTimeout(function () {
		overlay.style.visibility = 'hidden'
	}, 300)
	overlay.classList.remove('active')
	popup.classList.remove('show-popup')
	navBtn.removeAttribute('disabled')
}

const checkForm = input => {
	input.forEach(el => {
		el.value === '' ? showError(el, el.placeholder) : removeError(el)
	})
}

window.onload = () => {
	btnForm.addEventListener('click', e => {
		e.preventDefault()
		checkForm([msgForm, nameForm, emailForm])
		validateEmail(emailForm)
		checkErrors()
	})
}

const navBarOpacity = () =>
	window.scrollY >= scrollThreshold ? navBar.classList.add('nav__opacity') : navBar.classList.remove('nav__opacity')

const alingmentToNavBar = link => {
	const targetId = link.getAttribute('href').substring(1)
	const targetElement = document.getElementById(targetId)

	if (targetElement) {
		const targetPosition = targetElement.offsetTop - navbarHeight
		window.scrollTo({
			top: targetPosition,
		})
	}
}

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

const hrefToURL = correspondingLink => {
	const href = correspondingLink.getAttribute('href')
	const currentURL = window.location.href.split('#')[0]
	const newURL = `${currentURL}${href}`
	history.pushState({}, '', newURL)
}

const cardsSizes = () => {
	const cardImgs = document.querySelectorAll('.about-us__card-img')
	const cardInfos = document.querySelectorAll('.about-us__card-info')
	const cards = document.querySelectorAll('.about-us__card')

	let maxHeight = 0

	cardInfos.forEach((cardInfo, index) => {
		const infoHeight = parseInt(window.getComputedStyle(cardInfo).height)
		const imgHeight = parseInt(window.getComputedStyle(cardImgs[index]).height)

		if (infoHeight > imgHeight) {
			maxHeight = infoHeight
		} else {
			maxHeight = imgHeight
		}
	})

	cardInfos.forEach((cardInfo, index) => {
		const cardImg = cardImgs[index]
		const card = cards[index]
		const info = cardInfo

		cardImg.style.height = `${maxHeight}px`
		card.style.height = `${maxHeight}px`
		info.style.height = `${maxHeight}px`
	})
}

handleCurrentYear()
checkCookies()
cardsSizes()
window.addEventListener('scroll', navBarOpacity)
navBtn.addEventListener('click', handleNav)

images.forEach(image => {
	image.addEventListener('click', () => {
		const clickedSrc = image.getAttribute('src')

		fullscreenImages.forEach(fullscreenImg => {
			const fullscreenSrc = fullscreenImg.getAttribute('src')
			const parentLi = fullscreenImg.parentElement

			if (clickedSrc === fullscreenSrc) {
				parentLi.classList.toggle('animation')
				correspondingFullscreenLi = parentLi
				handleOverlay()
				blockScroll.classList.add('block-scroll')
			} else {
				parentLi.classList.remove('animation')
			}
		})
	})
})

window.addEventListener('click', e => {
	fullscreenImages.forEach(img => {
		const parentLi = img.parentElement
		if (e.target === img || e.target === parentLi) {
			closeOverlay()
			correspondingFullscreenLi.classList.remove('animation')
		}
	})
})

window.addEventListener('click', e => {
	e.target === overlay && !popup.classList.contains('show-popup') && cookiePopup.classList.contains('close-popup')
		? closeOverlay()
		: false
})

window.addEventListener('keydown', e => {
	if (e.key === 'Escape' && correspondingFullscreenLi.classList.contains('animation')) {
		closeOverlay()
		correspondingFullscreenLi.classList.remove('animation')
	}
})

popupBtn.addEventListener('click', e => {
	popupBtnRemoveOverlay(e)
	navBtn.removeAttribute('disabled')
})
links.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		navBtn.classList.contains('is-active') ? closeOverlay() : false
		alingmentToNavBar(link)
	})
})

headerLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		alingmentToNavBar(link)
	})
})

cookieAccept.addEventListener('click', e => {
	cookiePopupClose(e)
	navBtn.removeAttribute('disabled')
})

const options = {
	root: null,
	rootMargin: `${rootMarginTop} 0px ${rootMarginBottom} 0px`,
	threshold: 0,
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		const id = entry.target.getAttribute('id')
		const correspondingLink = document.querySelector(`a[href="#${id}"]`)
		const hamburgerStyle = window.getComputedStyle(document.querySelector('.hamburger'))
		const svgNavIcon = document.querySelector('.svg-icon')

		if (entry.isIntersecting) {
			if (hamburgerStyle.getPropertyValue('display') === 'none') {
				hrefToURL(correspondingLink)
				const desktopLinkColor = getComputedStyle(correspondingLink).getPropertyValue('--desktop-link-color')
				correspondingLink.style.color = desktopLinkColor
				id === 'home' ? svgNavIcon.setAttribute('fill', desktopLinkColor) : svgNavIcon.setAttribute('fill', '#000')
			} else {
				hrefToURL(correspondingLink)
				const mobileLinkColor = getComputedStyle(correspondingLink).getPropertyValue('--mobile-link-color')
				correspondingLink.style.color = mobileLinkColor
				id === 'home' ? svgNavIcon.setAttribute('fill', mobileLinkColor) : svgNavIcon.setAttribute('fill', '#fff')
			}
		} else {
			correspondingLink.style.color = ''
		}
	})
}, options)

sectionsAndHeader.forEach(section => {
	observer.observe(section)
})

document.addEventListener('DOMContentLoaded', () => {
	const url = window.location.href
	const sectionId = url.split('#')[1]
	if (sectionId) {
		const targetElement = document.getElementById(sectionId)
		if (targetElement) {
			const targetPosition = targetElement.offsetTop - navbarHeight
			window.scrollTo({ top: targetPosition })
		}
	}
})
