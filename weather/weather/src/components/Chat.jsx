import React, { useRef, useState } from 'react';
import './Chat.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {Launcher} from 'react-chat-window'

const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat(props) 
{
    const peerEmail = props.peerEmail
    const profileUsername = props.profileUsername
    
    return (
        <div className="App">
            <section>
                {<ChatRoom username={profileUsername} peerEmail ={peerEmail}/>}
            </section>
        </div>
    );
}


function ChatRoom(props) 
{
    var name;
    if(auth.currentUser.email < props.peerEmail)
        name = auth.currentUser.email + "-" + props.peerEmail
    else
        name = props.peerEmail + "-" + auth.currentUser.email
    const messagesRef = firestore.collection('messages').doc(name).collection(name);
    const query = messagesRef.orderBy('createdAt').limit(100);
    const [messages] = useCollectionData(query, { idField: 'id' });
    
    var list = []
    if(messages != null)
    {
        for(var i = 0 ; i < messages.length ; i++)
        {
            var item = {author:'', type:'text', data:{text: ''}}
            if(auth.currentUser.uid === messages[i].uid)
                item.author = 'me'
            else
                item.author = 'them'
            item.data.text = messages[i].text
            list.push(item)
        }
    }

    const sendMessage = async (message) => 
    {
        const { uid } = auth.currentUser;
        await messagesRef.add({
            text: message.data.text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        })
    }
    
    
    return (
    <>
        <Launcher
            agentProfile={{
                teamName: props.username
            }}
            onMessageWasSent={sendMessage.bind(this)}
            messageList={list}
        />
    </>)
}

export default Chat;
