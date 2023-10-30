const navBtn = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')
const links = document.querySelectorAll('.nav__item')
const blockScroll = document.body
const overlayVisibility = (overlay.style.visibility = 'hidden')
const footerYear = document.querySelector('.footer__year')

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
	if (nameForm.value == '' || emailForm.value == '' || msgForm.value == '') {
		console.log('error')
		nameForm.setAttribute('required', '')
		emailForm.setAttribute('required', '')
		msgForm.setAttribute('required', '')
	} else if (nameForm.value !== '' || emailForm.value !== '' || msgForm.value !== '') {
		// Generowanie pięciocyfrowej liczby do zmiennej contact_number
		contactForm.contact_number.value = Math.floor(Math.random() * 100000)

		// Wykorzystanie odpowiednich ID usługi i szablonu z wcześniejszych kroków
		emailjs
			.sendForm('service_4rabq7e', 'template_6wtj7m3', contactForm)
			.then(() => {
				console.log('SUCCESS!')
			})
			.catch(error => {
				console.log('FAILED...', error)
			})
	}
}
// Inicjalizacja EmailJS z kluczem publicznym
;(function () {
	const publicKey = 'lgkz6CPgh6GbEuCoO'
	emailjs.init(publicKey)
})()

// Obsługa zdarzenia po załadowaniu strony
window.onload = () => {
	// Nasłuchiwanie zdarzenia submit formularza
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
