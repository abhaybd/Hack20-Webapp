import React from "react";
import {GoogleMap, HeatmapLayer, LoadScript, Marker} from '@react-google-maps/api';
import {db} from "./Database";

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const libraries = ["visualization"];

function renderHeatmap(data, google, lat, long, p) {
    db.getUsersInArea(lat, long, p, function(arr) {
        for (let coord of arr) {
            data.push(new google.maps.LatLng(coord.lat, coord.lng));
        }
    });
}

export default function Map(props) {
    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    let data;

    const heatmapLoad = layer => {
        data = layer.data;
        renderHeatmap(data, window.google, 0,0,1);
    }

    const zoomChanged = () => {
        renderHeatmap(data, window.google, )
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAb1opXdUUzPE2NzzKwbDVpDowXreTkPpo"
            libraries={libraries}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={props.center}
                zoom={props.zoom ?? 10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <HeatmapLayer data={[]} onLoad={heatmapLoad}/>
                { /* Child components, such as markers, info windows, etc. */}
            </GoogleMap>
        </LoadScript>
    )
}