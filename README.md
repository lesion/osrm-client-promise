## osrm-client-promise

An isomorphic promising OSRM client (v4)

## API
All osrm-backend v4 api is supported, please take a look at [documentation](https://github.com/Project-OSRM/osrm-backend/wiki/Server-API---v4,-old):


| Service     |           Description                                     |
|-------------|-----------------------------------------------------------|
| [viaroute](https://github.com/Project-OSRM/osrm-backend/wiki/Server-API---v4,-old#service-viaroute)  | shortest path between given coordinates                   |
| [nearest](https://github.com/Project-OSRM/osrm-backend/wiki/Server-API---v4,-old#service-nearest)   | returns the nearest street segment for a given coordinate |
| [table](https://github.com/Project-OSRM/osrm-backend/wiki/Server-API---v4,-old#service-table)     | computes distance tables for given coordinates            |
| [match](https://github.com/Project-OSRM/osrm-backend/wiki/Server-API---v4,-old#service-match)     | matches given coordinates to the road network             |
| [trip](https://github.com/Project-OSRM/osrm-backend/wiki/Server-API---v4,-old#service-trip)      | Compute the shortest round trip between given coordinates

## Usage example

```javascript
// instantiate a new client (without arg `http://router.project-osrm.org` will be used)
let osrm = new OSRMClient('http://localhost:5000')

osrm.nearest([52.4224,13.333086])
.then(ret => { 
  console.log(ret)
  // {
  //    "status": 200,
  //    "mapped_coordinate": [52.42259, 13.33383],
  //    "name": "Mariannenstraße" 
  // } 
})


osrm.trip({loc: [45, 8], [45.1, 8.1]})

```

