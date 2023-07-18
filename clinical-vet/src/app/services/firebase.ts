import firebase from "firebase/app";
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDgzmEz5FHzmxcwkOsa8sHoXrCXs0WnAWI",
    authDomain: "clinical-vet.firebaseapp.com",
    projectId: "clinical-vet",
    storageBucket: "clinical-vet.appspot.com",
    messagingSenderId: "1080457819593",
    appId: "1:1080457819593:web:a2cddf62272b2bb86e6418",
    measurementId: "G-5254KXK1S1",
};

if(firebase.apps.length){
    firebase.app()
}else{
    firebase.initializeApp(firebaseConfig)
}

const database = firebase.database()

export {database, firebase}