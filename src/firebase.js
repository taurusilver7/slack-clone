import firebase from "firebase";

const firebaseApp = firebase.initializeApp();

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, provider };
export default auth;
