import { ConversationSelectProps } from '../types/index';
import styled from 'styled-components';
import { useRecipient } from '../hooks/useRecipient';
import RecipientAvatar from './RecipientAvatar';
import { useRouter } from 'next/router';

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
	console.log('users', conversationUser);
	const { recipient, recipientEmail } = useRecipient(conversationUser);
	const route = useRouter();
	const onSelectConversation = () => {
		route.push(`/conversations/${id}`)
	}
	return (
		<StyleContainerSelect onClick={onSelectConversation}>
			<RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
			<span>{recipientEmail}</span>
		</StyleContainerSelect>
	);
};

export default ConversationSelect;
