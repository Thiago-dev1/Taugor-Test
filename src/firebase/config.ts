
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC0jcXvGhB3QiGGKZc5NskzF5OhHhxLlRI',
  authDomain: 'taugor-292df.firebaseapp.com',
  projectId: 'taugor-292df',
  storageBucket: 'taugor-292df.appspot.com',
  messagingSenderId: '381559951567',
  appId: '1:381559951567:web:f89359c66703a12fde67ba',
  measurementId: 'G-BF4QZD2DR5'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }