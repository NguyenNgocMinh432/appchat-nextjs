// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA7XoM7AJtAdF9glSk6qqx0Z7Y9Nlxr_y8',
	authDomain: 'appchat-nextjs-20760.firebaseapp.com',
	projectId: 'appchat-nextjs-20760',
	storageBucket: 'appchat-nextjs-20760.appspot.com',
	messagingSenderId: '1062489960497',
	appId: '1:1062489960497:web:a73054302de65524c66510',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const Auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export { db, Auth, provider, providerFacebook };
