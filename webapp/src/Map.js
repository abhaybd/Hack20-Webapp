import React from "react";
import {GoogleMap, HeatmapLayer, LoadScript, Marker, StandaloneSearchBox} from '@react-google-maps/api';
import Geocode from "react-geocode";
import {db} from "./Database";

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const libraries = ["visualization", "places"];

Geocode.setApiKey("AIzaSyAb1opXdUUzPE2NzzKwbDVpDowXreTkPpo");

function renderHeatmap(data, LatLng, bounds) {
    // Za = latitude, Va = longitude
    db.getUsersInArea(bounds.Za.i, bounds.Za.j, bounds.Va.i, bounds.Va.j, function (arr) {
        console.log(`Found ${arr.length} users!`);
        data.clear();
        for (let coord of arr) {
            data.push(new LatLng(coord.lat, coord.lng));
        }
    });
}

export default function Map(props) {
    const [map, setMap] = React.useState(null);
    let currentLocation = {lat: 47.655548, lng: -122.303200};
    let searchBox;
    let marker;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }

    function getPosition(position) {
        if (map) {
            map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        }
        currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    }

    const onLoad = React.useCallback(function callback(map) {
        map.setCenter(props.center)
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    let data;

    const heatmapLoad = layer => {
        data = layer.data;
    }

    const onIdle = () => {
        renderHeatmap(data, window.google.maps.LatLng, map.getBounds());
    }

    const searchBoxLoad = ref => searchBox = ref;
    const onPlacesChanged = () => Geocode.fromAddress(searchBox.getPlaces()[0]['formatted_address']).then(
        response => {
            marker.position = response.results[0].geometry.location;
            if(map) {
                map.setCenter(marker.position)
            }
            console.log(marker.position)
        },
        error => {
            console.error(error);
        }
    );

    const markerLoad = ref => marker = ref;

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAb1opXdUUzPE2NzzKwbDVpDowXreTkPpo"
            libraries={libraries}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={props.center}
                zoom={props.zoom ?? 14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onIdle={onIdle}
            >
                <StandaloneSearchBox
                    onLoad={searchBoxLoad}
                    onPlacesChanged={
                        onPlacesChanged
                    }
                    >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        marginLeft: "-120px"
                        }}
                    />
                </StandaloneSearchBox>
                <Marker
                    onLoad={markerLoad}
                    onPositionChanged={markerLoad}
                    position={currentLocation}
                />
                <HeatmapLayer data={[]} onLoad={heatmapLoad}/>
                { /* Child components, such as markers, info windows, etc. */}
            </GoogleMap>
        </LoadScript>
    )
}