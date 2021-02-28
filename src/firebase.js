import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD63GsSnpdsqpF8XzxPyfo0VMjYci9Hvx8",
  authDomain: "slack-28797.firebaseapp.com",
  projectId: "slack-28797",
  storageBucket: "slack-28797.appspot.com",
  messagingSenderId: "573466524253",
  appId: "1:573466524253:web:16363588a74cfce4e1abb4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, provider };
export default auth;
