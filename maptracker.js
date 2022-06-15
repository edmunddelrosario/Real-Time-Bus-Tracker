//mapboxgl.accessToken = 'pk.eyJ1IjoibWFya3JvYmVydHMiLCJhIjoiY2ttM3B4eGkyMGFqZDJwbXdnMmY1NzIyNSJ9.6tfZpmiXf7ip35QT3zSfpQ'
 
//loading map to the browser
map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.091525, 42.353350],
  zoom: 12,
});

// Request bus data from MBTA
async function busData(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

//set interval time to fetch data
async function runInterval(){  
	const locations = await busData();
	// Set time interval to request new data 
	setTimeout(run, 30000);
	}

//get bus location from data and mark bus location 
async function markBusLocation(){

	let locations = await busData();
	locations.forEach((bus) => {
		addLocationMarker(bus);
	});

	//timer
	setTimeout(markBusLocation, 30000);
}

let markers = [];

function addLocationMarker(bus) {
	let lng = bus.attributes.longitude;
	let lat = bus.attributes.latitude;
	let marker = new mapboxgl.Marker();
		marker.setLngLat([lng, lat]);
		marker.addTo(map);
	markers.push(marker);
}

markBusLocation();
 



 
