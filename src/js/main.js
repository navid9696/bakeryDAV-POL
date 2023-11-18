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
const navbarHeight = navBar.clientHeight
const headerBtn = document.querySelector('.header__btn-link')
const headerArrowDown = document.querySelector('.header__arrow-link')
const headerLinks = [headerBtn, headerArrowDown]
const viewportHeight = window.innerHeight
const rootMarginCorrecting = 110
const rootMarginBottom = `${-(viewportHeight - rootMarginCorrecting)}px`
const sectionsAndHeader = [header, ...sections]

overlay.style.visibility = 'hidden'

emailjs.init('lgkz6CPgh6GbEuCoO')
let emailValid = 0

const validateEmail = email => {
	const emailReg =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/gim
	if (emailReg.test(email.value) && nameForm.value != '' && msgForm.value != '') {
		removeError(email)
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
		if (el.classList.contains('error')) {
			errorCount++
		}
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
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			removeError(el)
		}
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

handleCurrentYear()
navBtn.addEventListener('click', handleNav)
window.addEventListener('click', e =>
	e.target === overlay && !popup.classList.contains('show-popup') ? closeOverlay() : false
)
popupBtn.addEventListener('click', popupBtnRemoveOverlay)
links.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		if (navBtn.classList.contains('is-active')) {
			closeOverlay()
		}

		alingmentToNavBar(link)
	})
})
headerLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		alingmentToNavBar(link)
	})
})

const options = {
	root: null,
	rootMargin: `-110px 0px ${rootMarginBottom} 0px`,
	threshold: 0,
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		const id = entry.target.getAttribute('id')
		const correspondingLink = document.querySelector(`a[href="#${id}"]`)
		const hamburgerStyle = window.getComputedStyle(document.querySelector('.hamburger'))

		if (entry.isIntersecting) {
			if (hamburgerStyle.getPropertyValue('display') === 'none') {
				correspondingLink.style.color = '#604a34'
			} else {
				correspondingLink.style.color = '#ffa963'
			}
		} else {
			correspondingLink.style.color = ''
		}
	})
}, options)

sectionsAndHeader.forEach(section => {
	observer.observe(section)
})
