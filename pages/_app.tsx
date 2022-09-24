import type { AppProps } from 'next/app';
import { Auth, db } from '../config/firebase';
import Login from './login';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

function MyApp({ Component, pageProps }: AppProps) {
	const [loggedInUser, loading, _error] = useAuthState(Auth);

	useEffect(() => {
		const setUserInDb = async () => {
			try {
				await setDoc(
					doc(db, 'users', loggedInUser?.email as string),
					{
						email: loggedInUser?.email,
						lastSeen: serverTimestamp(),
						photoUr: loggedInUser?.photoURL,
					},
					{
						merge: true,
					}
				);
			} catch (error) {}
		};
		if (loggedInUser) {
			setUserInDb();
		}
	}, [loggedInUser]);

	if (loading) {
		return <Loading />;
	} else if (!loggedInUser) {
		if (!loggedInUser) return <Login />;
	} else {
		return <Component {...pageProps} />;
	}
}

export default MyApp;
