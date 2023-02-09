import './App.css';

import { useEffect, useRef, useState } from 'react';

import io from "socket.io-client";


//connect with backend
const socket=io.connect("http://localhost:8090");

function App() {

  const name=useRef();

  const room=useRef();

  const messages=useRef();

  const [receivedMessages,setReceivedMessages]=useState();

  const [messagesList,setMessagesList]=useState([]);

  function Joinroom(){
    socket.emit("join_room",{name:name.current.value , room:room.current.value})
  }

  function SendMessages(){
    socket.emit("send_messages",{room:room.current.value , messages:messages.current.value})
  }

  useEffect(()=>{
    socket.on("received_messages",(data)=>[
      // console.log(data)
      setMessagesList((list)=>[...list , data])
    ])  
  },[socket])

  return (
    <div>
      <input placeholder='name' ref={name}/>

      <input placeholder='room' ref={room}/>

      <button onClick={Joinroom}>join room</button>

      <div>
        <input placeholder='messages' ref={messages}/>

        <button onClick={SendMessages}>Send</button>
      </div>

      <div>
        {
          messagesList && messagesList.map((item,i)=>{
            return(
              <div>{item}</div>
            )
          })
        }
      </div>

    </div>
  );

}

export default App;