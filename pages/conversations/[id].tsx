import { doc, getDoc, getDocs } from 'firebase/firestore';
import { GetServerSideProps, PreviewData } from 'next';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import ConversationScreen from '../../components/Conversation';
import Sidebar from '../../components/Sidebar';
import { Auth, db } from '../../config/firebase';
import { Conversation, Messages } from '../../types';
import { generateQueryMessage, transforMessage } from '../../utils/getMessageInConversion';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

interface Props {
	conversation: Conversation;
	message: Messages[];
}
const StyleContainer = styled.div`
	display: flex;
`;
const StyledConversationContainer = styled.div`
	flex-grow: 1;
	overflow: scroll;
	height: 100vh;
	::-webkit-scrollbar {
		display: none;
	}
	/* Hide scrollbar for IE, Edge and Firefox */
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;
const Conversation = ({ conversation, message }: Props) => {
	console.log('message', message);

	const [loggedInUser, _loading, _error] = useAuthState(Auth);
	return (
		<StyleContainer>
			<Head>
				<title>
					{' '}
					Conversation with {getRecipientEmail(conversation.users, loggedInUser)}{' '}
				</title>
			</Head>
			<Sidebar />
			<StyledConversationContainer>
				<ConversationScreen conversation={conversation} message={message} />
			</StyledConversationContainer>
		</StyleContainer>
	);
};

export default Conversation;

export const getServerSideProps: GetServerSideProps<Props, { id: string }, PreviewData> = async (
	context
) => {
	console.log('context', context);
	const conversationId = context.params?.id;
	const conversationRef = doc(db, 'conversations', conversationId as string | undefined);
	console.log('conversationId', conversationId);
	console.log('conversationRef', conversationRef);

	const conversationsSnapshot = await getDoc(conversationRef);
	// Lay message
	const queryMessage = generateQueryMessage(conversationId);
	console.log('queryMessage', queryMessage);
	const messageSnapshot = await getDocs(queryMessage);
	console.log('messageSnapshot', messageSnapshot.docs);
	const message = messageSnapshot.docs.map((messageDoc) => transforMessage(messageDoc));
	console.log('message', message);

	return {
		props: {
			conversation: conversationsSnapshot.data() as Conversation,
			message,
		},
	};
};
