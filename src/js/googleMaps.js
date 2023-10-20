'use strict'
function initMap() {
	const myLatLng = {
		lat: 50.30388011316907,
		lng: 18.692461793865778,
	}
	const map = new google.maps.Map(document.getElementById('gmp-map'), {
		zoom: 18,
		center: myLatLng,
		fullscreenControl: false,
		zoomControl: true,
		streetViewControl: false,
	})
	new google.maps.Marker({
		position: myLatLng,
		map,
		title: 'My location',
	})
}
