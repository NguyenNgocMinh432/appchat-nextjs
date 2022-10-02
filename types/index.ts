import { Timestamp } from "firebase/firestore";

export interface Conversation {
    users: string[];
}
export interface ConversationSelectProps {
    id: string;
    conversationUser: Conversation['users']
}

export interface AppUser {
    email:string,
    lastSeen: Timestamp,
    photoUrl: string
}

export interface RecipientAvatarProps {
    recipient: AppUser | undefined;
    recipientEmail: string | undefined;
}
export interface Messages {
    id: string;
    conversation_id: string;
    text: string;
    sent_at: string | null
    user: string
}