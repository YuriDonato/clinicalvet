import { initializeApp } from 'firebase/app'
import 'firebase/database'
import * as db from 'firebase/database'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDgzmEz5FHzmxcwkOsa8sHoXrCXs0WnAWI',
  authDomain: 'clinical-vet.firebaseapp.com',
  projectId: 'clinical-vet',
  storageBucket: 'clinical-vet.appspot.com',
  messagingSenderId: '1080457819593',
  appId: '1:1080457819593:web:a2cddf62272b2bb86e6418',
  measurementId: 'G-5254KXK1S1'
})

const database = db.getDatabase(firebaseApp)
const ref = db.ref
const get = db.get
const onValue = db.onValue
const set = db.set
const push = db.push
const remove = db.remove
const child = db.child
const update = db.update

export { database, ref, get, onValue, set, push, remove, child, update }
