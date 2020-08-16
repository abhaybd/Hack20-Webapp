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

    getUsersInArea(lat, long, precision, callback) {
        // TODO: map distance to precision
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
