import React from 'react';
import { useEffect } from 'react';

import { useState } from 'react';

import io from 'socket.io-client';

const socket=io.connect("http://localhost:3333");

export default function Chat(data) {
    const [messages,setMessages]=useState();


    function Send(){
        if(messages!==""){
            socket.emit("send-messages",{author:data.name , roomId:data.roomId , messages:messages})
        }
    }

    useEffect(()=>{
        socket.on("receive-messages",(data)=>{
            console.log(data)
        })
    },[socket])

    return (
        <div>
            <div>
                <input placeholder="Messages..." onChange={(event)=>{setMessages(event.target.value)}}/>
                <button onClick={Send}>Send</button>
            </div>
        </div>
    )
}
