import Button from '@mui/material/Button';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import LogoAppChat from '../assets/images/Avatar__user.png';
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { Auth } from '../config/firebase';

const StyleContainer = styled.div`
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: whitesmoke;
`;
const StyledLoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 100px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 4px 4.3px 2.2px rgba(0, 0, 0, 0.019), 8.9px 9.5px 5.3px rgba(0, 0, 0, 0.024),
		15.8px 16.8px 10px rgba(0, 0, 0, 0.028), 26.9px 28.6px 17.9px rgba(0, 0, 0, 0.032),
		46.8px 49.8px 33.4px rgba(0, 0, 0, 0.035), 94px 100px 80px rgba(0, 0, 0, 0.04);
`;
const StyledImageWrapper = styled.div`
	margin-bottom: 50px;
`;
const ButtonFacebook = styled(Button)`
	margin-top: 10px;
`

const Login = () => {
	const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(Auth);
	const [signInWithFacebook, user, loading, error] = useSignInWithFacebook(Auth);
	const [signInWithGithub, userGithub, loadingGithub, errorGithub] = useSignInWithGithub(Auth);
    const signIn = () => {
        signInWithGoogle();
    }
	const signInFacebook = () => {
		signInWithFacebook();
	}
	const signInGithub = () => {
		signInWithGithub();		
	}
	return (
		<StyleContainer>
			<Head>
				<title>Login</title>
			</Head>
			<StyledLoginContainer>
				<StyledImageWrapper>
					<Image src={LogoAppChat} height="200px" width="200px" alt="Logo App" />
				</StyledImageWrapper>
				<Button
					variant="outlined"
					onClick={signIn}
				>
					Sign in with Google
				</Button>
				<ButtonFacebook
					variant="outlined"
					onClick={signInFacebook}
				>
					Sign in with Facebook
				</ButtonFacebook>
				<ButtonFacebook
					variant="outlined"
					onClick={signInGithub}
				>
					Sign in with Github
				</ButtonFacebook>
			</StyledLoginContainer>
		</StyleContainer>
	);
};

export default Login;
