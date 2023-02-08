import './App.css';

import { useState } from 'react';

import io from "socket.io-client";

import Chat from './Chat';

//connect with backend
const socket=io.connect("http://localhost:3333");

function App() {
  const [name,setName]=useState();

  const [roomId,setRoomId]=useState();

  function JoinRoom(){
    if(name!="" && roomId!=""){
      socket.emit("join-room",{name:name , roomId:roomId});
    }
  }

  return (
    <div className="App">

      <input placeholder='Name...' onChange={(event)=>{setName(event.target.value)}}/>

      <input placeholder='Room id...' onChange={(event)=>{setRoomId(event.target.value)}}/>

      <button onClick={JoinRoom}>Join Room</button>

      <Chat socket={socket} name={name} roomId={roomId}/>
    </div>
  );

}

export default App;
