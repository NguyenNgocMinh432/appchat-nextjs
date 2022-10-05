import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { Auth } from '../config/firebase';
import { Messages } from '../types';

const StyledMessage = styled.p`
	width: fit-content;
	word-break: break-all;
	max-width: 90%;
	min-width: 30%;
	padding: 15px 15px 30px;
	border-radius: 8px;
	margin: 10px;
	position: relative;
`;
const StyledSendMessage = styled(StyledMessage)`
	margin-left: auto;
	background-color: #dcf8c6;
`;
const StyledReciverMessage = styled(StyledMessage)`
	background-color: whitesmoke;
`;
const StyledTimestamp = styled.p`
	color: gray;
	padding: 10px;
	font-size: x-small;
	position: absolute;
	bottom: 0;
	right: 0;
	text-align: right;
`;

const Message = ({ key, message }: { key: number; message: Messages }) => {
	const [loggedInUser, _loading, _error] = useAuthState(Auth);

	const MessageType =
		loggedInUser?.email === message?.user ? StyledSendMessage : StyledReciverMessage;

	return (
		<div>
			<MessageType>
				{message.text}
			<StyledTimestamp>{message.sent_at}</StyledTimestamp>
			</MessageType>
		</div>
	);
};

export default Message;
