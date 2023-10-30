const navBtn = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')
const links = document.querySelectorAll('.nav__item')
const blockScroll = document.body
const footerYear = document.querySelector('.footer__year')
const contactForm = document.querySelector('#contact-form')
const nameForm = document.querySelector('#name')
const emailForm = document.querySelector('#email')
const msgForm = document.querySelector('#msg')
const btnForm = document.querySelector('.contact-form__input-btn')

const overlayVisibility = (overlay.style.visibility = 'hidden')

const validateEmail = email => {
	const emailReg =
		/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
	return emailReg.test(email)
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

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

const checkForm = () => {
	if (nameForm.value !== '' && emailForm.validity.patternMismatch == false && msgForm.value !== '') {
		contactForm.contact_number.value = Math.floor(Math.random() * 100000)
		emailjs
			.sendForm('service_4rabq7e', 'template_6wtj7m3', contactForm)
			.then(() => {
				console.log('SUCCESS!')
			})
			.catch(error => {
				console.log('FAILED...', error)
			})
	} else if (emailForm.validity.patternMismatch) {
		console.log('error')
		// nameForm.setAttribute('required', '')
		// emailForm.setAttribute('required', '')
		// msgForm.setAttribute('required', '')
	}
}

;(function () {
	const publicKey = 'lgkz6CPgh6GbEuCoO'
	emailjs.init(publicKey)
})()

window.onload = () => {
	contactForm.addEventListener('submit', event => {
		event.preventDefault()

		checkForm()
	})
}

handleCurrentYear()

navBtn.addEventListener('click', handleNav)
window.addEventListener('click', e => (e.target === overlay ? closeOverlay() : false))
links.forEach(link => {
	link.addEventListener('click', closeOverlay)
})
