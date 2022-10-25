import React, { useRef, useEffect } from 'react'
import * as C from './styles'
import { db } from '../../services/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Message } from '../index'

export const ChatBody = ({chatId}) => {

  const [messagesRes] = useCollection(
    db
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('timestamp', 'asc')
  )

    const refBody = useRef('')

    useEffect(() =>{
      if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
        refBody.current.scrollTop =
          refBody.current.scrollHeight - refBody.current.offsetHeight
      }
    },[messagesRes])

  return (
    <C.Container ref={refBody}>
      {messagesRes?.docs.map((message) => (
        <Message 
        key={message.id}
        user={message.data().user}
        message={{
          message: message.data().message,
          timestamp: message.data().timestamp?.toDate().getTime(),
        }}
        />
      ))}
    </C.Container>
  )
}