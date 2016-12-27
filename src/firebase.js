import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCB29zhTp9sg_jClrXdjNGUzobHkgqOHWY",
  authDomain: "pain-tracker-dbc9e.firebaseapp.com",
  databaseURL: "https://pain-tracker-dbc9e.firebaseio.com",
  storageBucket: "pain-tracker-dbc9e.appspot.com",
  messagingSenderId: "1080360049885"
};

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

export const isAuthenticated = () => {
  if (!auth.currentUser) {
    let hasLocalUser = false;
    for (let key in localStorage) {
      if (key.startsWith('firebase:authUser:')) {
        hasLocalUser = true;
      }
    }
    return hasLocalUser;
  }
  return true;
}