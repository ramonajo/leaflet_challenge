//data and url
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson'

//createMarkers function
function createMarkers(feature = {}) {
    let marker = L.marker([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
    return marker
}

d3.json(url).then(function (response) {
    console.log(response);
    let earthquakeList = response.features
	let myMap = createMap(earthquakeList)

});

//create map function

function createMap(features = [{}]) {
	let earthquakeMarkers = []
	//loop through array.
    features.forEach(feature => {
		let marker = createMarkers(feature)
		// add marker
		earthquakeMarkers.push(marker)
	})
    //layer group
    let markerLayerGroup = L.layerGroup(earthquakeMarkers)
    //tile layer
	let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	})

	
    //overlayMaps object
	let overlayMaps = {
		"Earthquake Locations": markerLayerGroup
	}
    //map
    let myMap = L.map('map', {
        center: [37.1 , -95.7],
        zoom: 7,
    });

	

	return myMap
}