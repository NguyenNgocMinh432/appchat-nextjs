import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVerticalIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { Auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from 'firebase/firestore';
import { Conversation } from "../types/index";
import ConversationSelect from './ConversationSelect';

const StyleContainer = styled.div`
	height: 100vh;
	min-width: 300px;
	max-width: 350px;
	overflow-y: scroll;
	border-right: 1px solid whitesmoke;
`;
const StyledHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
	position: sticky;
	top: 0;
	background-color: white;
	z-index: 1;
`;
const StyledSearch = styled.div`
	display: flex;
	align-items: center;
	padding: 15px;
	border-radius: 2px;
`;
const StyledSidebarButton = styled(Button)`
	width: 100%;
	border-top: 1px solid whitesmoke;
	border-bottom: 1px solid whitesmoke;
`;
const StyledUserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;
const StyledSearchInput = styled.input`
	outline: none;
	border: none;
	flex: 1;
`;

const Sidebar = () => {
	const [loggedInUser, _loading, _error ] = useAuthState(Auth);
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [recipientEmail, setRecipientEmail] = useState('');

	const toggleDialog = () => {
		setIsOpenDialog(!isOpenDialog);
		if ( !isOpenDialog ) {
			setRecipientEmail('')
		}
	}
	const closeDialog = () => {
		setIsOpenDialog(false);
	}
	// Lay du lieu ra de check
	const queryGetConversationCurrentUser = query(collection(db, 'conversations'), where('users', 'array-contains', loggedInUser?.email))
	const [conversationsSnapshot, __loading, __error] = useCollection(queryGetConversationCurrentUser)

	// Check xem cuoc hoi thoai do da ton tai hay chua
	const isConversationAlreadyExits = (recipientEmail: string) => {
		return conversationsSnapshot?.docs.find(conversations => (conversations.data() as Conversation).users.includes(recipientEmail))
	}

	const isInvitingSelf = recipientEmail === loggedInUser?.email
	const createConversation = async () => {
		if ( !recipientEmail ) return
		//Check xem co phai dang chat voi chinh minh hay khong
		if ( EmailValidator.validate( recipientEmail ) && !isInvitingSelf && !isConversationAlreadyExits(recipientEmail) ) {
			// add conversations user db
			await addDoc(collection(db , "conversations"), {
				users: [ loggedInUser?.email, recipientEmail ]
			})
		}
		closeDialog();
	}

	const logout = () => {
		signOut(Auth);
	};
	return (
		<StyleContainer>
			<StyledHeader>
				<Tooltip title={ loggedInUser?.email as string } placement="left">
					<StyledUserAvatar src={ loggedInUser?.photoURL || "" } />
				</Tooltip>

				<div>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVerticalIcon />
					</IconButton>
					<IconButton onClick={logout}>
						<LogoutIcon />
					</IconButton>
				</div>
			</StyledHeader>
			<StyledSearch>
				<SearchIcon />
				<StyledSearchInput placeholder="Search in conversations" />
			</StyledSearch>
			<StyledSidebarButton onClick={ () => {
				toggleDialog();
			}}>Start a new conversations</StyledSidebarButton>

			{/* hien thong tin nguoi dung */}
			{ conversationsSnapshot?.docs.map((conversations) => (
				<ConversationSelect 
				key={conversations.id} 
				id={conversations.id}
				conversationUser = {(conversations.data() as Conversation).users}
			/>)) }

			{/* dialog */}
			<Dialog open={isOpenDialog} onClose={toggleDialog}>
				<DialogTitle>New Conversation</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter a google email address for the user you width to chat width
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
						value = { recipientEmail }
						onChange={(e) => setRecipientEmail(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleDialog}>Cancel</Button>
					<Button disabled={!recipientEmail} onClick={createConversation}>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</StyleContainer>
	);
};

export default Sidebar;
