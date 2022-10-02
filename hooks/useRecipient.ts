import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth, db } from '../config/firebase';
import { getRecipientEmail } from '../utils/getRecipientEmail';
import { Conversation, AppUser } from './../types/index';
export const useRecipient = ( conversations: Conversation['users'] ) => {
    // get user
    const [loggedInUser, _loading, _error] = useAuthState(Auth);
    const recipientEmail = getRecipientEmail( conversations, loggedInUser );
    console.log("recipientEmail", recipientEmail);
    
    // get photo user
    const queryGetRecipient = query(collection(db, 'users'), where('email', '==', recipientEmail))
    const [recipientEmailSnapshot, __loading, __error] = useCollection(queryGetRecipient);
    const recipient = recipientEmailSnapshot?.docs[0]?.data() as AppUser || undefined;
    return {
        recipient,
        recipientEmail
    };
}