import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import { useRecipient } from '../hooks/useRecipient';
import { Conversation, Messages } from '../types';
import {
	convertFireStoreTimeStampToString,
	generateQueryMessage,
	transforMessage,
} from '../utils/getMessageInConversion';
import RecipientAvatar from './RecipientAvatar';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth, db } from '../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import InsertEmotionIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import { KeyboardEventHandler, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

export interface ConversationScreenProps {
	conversation: Conversation;
	message: Messages[];
}
const StyleRecipientHeader = styled.div`
	position: sticky;
	background-color: #fff;
	z-index: 100;
	top: 0;
	display: flex;
	align-items: center;
	padding: 11px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
`;
const StyledHeaderInfo = styled.div`
	margin-left: 15px;
	flex-grow: 1;
	> h3 {
		margin-top: 0;
		margin-bottom: 3px;
	}
	> span {
		font-size: 14px;
		color: gray;
	}
`;
const Styledh3 = styled.h3`
	word-break: break;
`;
const StyledHeaderIcons = styled.div`
	display: flex;
`;
const StyledMessageContainer = styled.div`
	padding: 30px;
	background-color: #e5ded8;
	min-height: 90vh;
`;
const StyledInputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: #fff;
	z-index: 1000;
`;
const StyleInput = styled.input`
	flex-grow: 1;
	outline: none;
	border: none;
	border-radius: 10px;
	background-color: whitesmoke;
	padding: 15px;
	margin-left: 15px;
	margin-right: 15px;
`;
const ConversationScreen = ({ conversation, message }: ConversationScreenProps) => {
	const [newMessage, setNewMessage] = useState('');
	const [loggedInUser, _loading, _error] = useAuthState(Auth);
	const conversationUser = conversation.users;
	const route = useRouter();
	const conversationId = route.query?.id;
	const { recipientEmail, recipient } = useRecipient(conversationUser);
	const queryMessages = generateQueryMessage(conversationId as string);
	const [conversationsSnapshot, messageLoading, __error] = useCollection(queryMessages);
	const showMessage = () => {
		if (messageLoading) {
			return message.map((message, index) => <Message key={index} message={message} />);
		}
		if (conversationsSnapshot) {
			return conversationsSnapshot.docs.map((docs, index) => (
				<Message key={index} message={transforMessage(docs)} />
			));
		}
		return null;
	};
	const addMessageToDbAndUpdateLastSeen = async () => {
		await setDoc(
			doc(db, 'users', loggedInUser?.email as string),
			{
				lastSeen: serverTimestamp(),
			},
			{ merge: true }
		);
		await addDoc(collection(db, 'messages'), {
			conversation_id: conversationId,
			sent_at: serverTimestamp(),
			text: newMessage,
			user: loggedInUser?.email,
		});
		setNewMessage('');
	};
	const sendMessageOnEnter: KeyboardEventHandler<HTMLInputElement> | undefined = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (!newMessage) return;
			addMessageToDbAndUpdateLastSeen();
		}
	};
	return (
		<>
			<StyleRecipientHeader>
				<RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
				<StyledHeaderInfo>
					<Styledh3>{recipientEmail}</Styledh3>
					{recipient && (
						<span>
							Last active :{convertFireStoreTimeStampToString(recipient.lastSeen)}
						</span>
					)}
				</StyledHeaderInfo>
				<StyledHeaderIcons>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</StyledHeaderIcons>
			</StyleRecipientHeader>

			<StyledMessageContainer>{showMessage()}</StyledMessageContainer>
			<StyledInputContainer>
				<InsertEmotionIcon />
				<StyleInput
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={sendMessageOnEnter}
				/>
				<IconButton>
					<SendIcon />
				</IconButton>
				<IconButton>
					<MicIcon />
				</IconButton>
			</StyledInputContainer>
		</>
	);
};

export default ConversationScreen;
