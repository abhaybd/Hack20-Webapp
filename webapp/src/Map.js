import React from "react";
import {GoogleMap, HeatmapLayer, LoadScript} from '@react-google-maps/api';
import {db} from "./Database";

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const libraries = ["visualization"];

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

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }

    function getPosition(position) {
        currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    }

    const onLoad = React.useCallback(function callback(map) {
        map.setCenter(currentLocation)
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
                <HeatmapLayer data={[]} onLoad={heatmapLoad}/>
                { /* Child components, such as markers, info windows, etc. */}
            </GoogleMap>
        </LoadScript>
    )
}