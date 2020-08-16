import firebase from "firebase/app";
import "firebase/firestore";
import Geohash from "latlon-geohash";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Database {
    constructor() {
        firebase.initializeApp(config);
        this.firestore = firebase.firestore();
        this.users = this.firestore.collection("users");

        this.addUser = this.addUser.bind(this);
        this.getUsersInArea = this.getUsersInArea.bind(this);
    }

    addUser(name, lat, long) {
        const hash = Geohash.encode(lat, long);
        this.users.doc(name).set({
            location: hash,
            latitude: lat,
            longitude: long,
            timestamp: Date.now()
        });
    }

    getPrecision(latDist, longDist) {
        // reference: https://www.movable-type.co.uk/scripts/geohash.html
        latDist = Math.abs(latDist);
        longDist = Math.abs(longDist);
        if (longDist > 1250 || latDist > 625) return 1;
        else if (longDist > 156 || latDist > 156) return 2;
        else if (longDist > 39.1 || latDist > 19.5) return 3;
        else if (longDist > 4.9 || latDist > 4.9) return 4;
        else if (longDist > 1.2 || latDist > 0.6) return 5;
        else if (longDist > 0.153 || latDist > 0.153) return 6;
        else return 7;
    }

    getUsersInArea(latMin, latMax, longMin, longMax, callback) {
        let lat = (latMin + latMax) / 2;
        let long = (longMin + longMax) / 2;

        let latDist = Math.abs(latMax - latMin) * 111; // 111km to the degree of latitude
        let longDist = Math.abs(longMax - longMin) * 111.3; // these many km at equator

        let precision = this.getPrecision(latDist, longDist);

        const start = Geohash.encode(lat, long, precision);
        const end = start.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
        this.users
            .where("location", ">=", start)
            .where("location", "<", end)
            .get()
            .then(function (q) {
                callback(q.docs.map(doc => {
                    const data = doc.data();
                    return {lat: data.latitude, lng: data.longitude};
                }));
            });
    }
}

const db = new Database();

export {db};
