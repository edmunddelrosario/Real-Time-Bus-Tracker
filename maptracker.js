mapboxgl.accessToken = 'pk.eyJ1IjoibWFya3JvYmVydHMiLCJhIjoiY2ttM3B4eGkyMGFqZDJwbXdnMmY1NzIyNSJ9.6tfZpmiXf7ip35QT3zSfpQ'
 
//loading map to the browser
map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.091525, 42.353350],
  zoom: 12,
});
addMarkers();

let markers = [];

function addMarker(bus) {
	let lng = bus.attributes.longitude;
	let lat = bus.attributes.latitude;
	let marker = new mapboxgl.Marker();
		  marker.setLngLat([lng, lat]);
		  marker.addTo(map);
	markers.push(marker);
}

async function run(){  
const locations = await getBusLocations();
// Set time interval to request new data 
setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
return json.data;
}

//get markers data from array
function getMarker(id) {
	let marker = markers.find((item) => {
		return item.id === id;
	});
	return marker;
}

//adding the bus markers to the map
async function addMarkers(){

	let locations = await getBusLocations();
	locations.forEach(function(bus) {
		let marker = getMarker(bus.id);
		addMarker(bus);
	});

	//timer
	setTimeout(addMarkers, 15000);
}
 



 