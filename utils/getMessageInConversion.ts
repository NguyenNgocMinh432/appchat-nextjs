import { timeStamp } from "console"
import { collection, DocumentData, orderBy, query, QueryDocumentSnapshot, Timestamp, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { Messages } from "../types"

export const generateQueryMessage = (conversationId?: String) => {
   return query(collection(db, 'message'), where('conversation_id', '==', conversationId), orderBy('sent_at', 'asc'))
}

export const transforMessage = (message:QueryDocumentSnapshot<DocumentData>) => ({
    id: message.id,
    ...message.data(),
    sent_at: (message.data().sent_at) ? convertFireStoreTimeStampToString((message.data().sent_at) as Timestamp) : null
} as Messages)

export const convertFireStoreTimeStampToString = (timeStamp: Timestamp) => new Date(timeStamp.toDate().getTime()).toLocaleString()
