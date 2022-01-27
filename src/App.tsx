import React, { useState,useEffect } from 'react';
import { io } from 'socket.io-client'
import './App.css';

function App() {
  

  const [ to,setTo ] = useState('')
  const [ message,setMessage ] = useState('')
  const [ room,setRoom ] = useState('')

  const socket = io("http://localhost:1337");
  
  socket.on('new-login',name => {
    console.log('new-login')
  })

  socket.on('private-message', params => {
    console.log('private-message')
  })

  socket.on('joined-room',() => {
    console.log(`you have joined the room`)
  })
  socket.on('public-message',(message) => {
    console.log(`${message}`)
  })



  const testHandler = () => {
    console.log(socket.id)
  }


  const sendMessageHanlder = () => {
    socket.emit('send-to', { recipient: to, message })
  }



  const joinRoomHandler = () => {
    socket.emit('join-room', { room })
  }


  return (
    <div className="App">
      <label onClick = { testHandler }>Test</label>
      <br />
      <input
        placeholder = 'To'
        onChange = { (event) => {
          setTo(event.target.value)
        } }  
      />
      <input
        placeholder = 'Message'
        onChange = { (event) => {
          setMessage(event.target.value)
        } }  
      />  
      <button onClick = { sendMessageHanlder }>Send</button>


      <div>
      <input
        placeholder = 'Message'
        onChange = { (event) => {
          setRoom(event.target.value)
        } }  
      />  
      <button onClick = { joinRoomHandler }>Send</button>
      </div>
    </div>
  );
}

export default App;
