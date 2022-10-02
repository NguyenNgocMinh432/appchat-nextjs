import { doc, getDoc, getDocs } from "firebase/firestore"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import Sidebar from "../../components/Sidebar"
import { Auth, db } from "../../config/firebase"
import { Conversation, Messages } from "../../types"
import { generateQueryMessage, transforMessage } from "../../utils/getMessageInConversion"
import { getRecipientEmail } from "../../utils/getRecipientEmail"

interface Props {
	conversation: Conversation,
	message: Messages
}
const StyleContainer = styled.div`
    display: flex;
`
const Conversation = ({conversation, message}: Props) => {
	console.log("message", message);
	
	const [ loggedInUser, _loading, _error] = useAuthState(Auth);
  return (
    <StyleContainer>
        <Head>
            <title> Conversation with {getRecipientEmail(conversation.users, loggedInUser)} </title>
        </Head>
        <Sidebar />
        {
			message.map((message,index) =>(<h1 key={index}>{JSON.stringify(message)}</h1>) )
		}
    </StyleContainer>
  )
}

export default Conversation

export const getServerSideProps: GetServerSideProps<Props, {id:string}> = async ( context ) => {
	console.log("context", context);
	const conversationId = context.params?.id;
	console.log("conversationId", conversationId);
	const conversationRef = doc(db, 'conversations', conversationId as String);
	const conversationsSnapshot = await getDoc(conversationRef)
	// Lay message
	const queryMessage = generateQueryMessage(conversationId);
	console.log("queryMessage", queryMessage);
	const messageSnapshot = await getDocs(queryMessage);
	console.log("messageSnapshot",messageSnapshot.docs);
	const message = messageSnapshot.docs.map(messageDoc => transforMessage(messageDoc))
	console.log("message",message);
	
	return {
		props: {
			conversation: conversationsSnapshot.data() as Conversation,
			message
		}
	}
}