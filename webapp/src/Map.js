import React from "react";
import {GoogleMap, LoadScript} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

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

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAb1opXdUUzPE2NzzKwbDVpDowXreTkPpo"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={props.center}
                zoom={props.zoom ?? 10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}