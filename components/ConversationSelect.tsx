import { ConversationSelectProps } from '../types/index';
import styled from 'styled-components';
import { useRecipient } from '../hooks/useRecipient';

const StyleContainerSelect = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 15px;
	word-break: break-all;
	:hover {
		background-color: #e9eaeb;
	}
`;

const ConversationSelect = ({ id, conversationUser }: ConversationSelectProps) => {
	console.log("users", conversationUser);
	const {recipient, recipientEmail} = useRecipient( conversationUser  );
	
	return <StyleContainerSelect>
		<span>{ recipientEmail }</span>
	</StyleContainerSelect>;
};

export default ConversationSelect;
