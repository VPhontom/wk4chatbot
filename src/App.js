import React, { useState } from 'react';


function App() {
 const [input, setInput] = useState('');
 const [messages, setMessages] = useState([]);


 const sendMessage = async () => {
   if (input.trim() === '') return;
    const newMessage = { sender: 'user', text: input };
   setMessages([...messages, newMessage]);
    try {
     const response = await fetch('https://kx1akbxb96.execute-api.ap-southeast-2.amazonaws.com/dev1/getReply', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ msg: input }),
     });
      if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
      const data = await response.json();
     const botMessage = { sender: 'bot', text: data.reply };  // Correctly extract 'reply' field
      setMessages((prevMessages) => [...prevMessages, botMessage]);
   } catch (error) {
     console.error('Error:', error.message);
   }
    setInput('');
 };


 const handleKeyPress = (event) => {
   if (event.key === 'Enter') {
     sendMessage();
   }
 };


 return (
   <div className="App" style={styles.container}>
     <div style={styles.chatBox}>
       {messages.map((message, index) => (
         <div
           key={index}
           style={{
             ...styles.message,
             alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
             backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#FFFFFF',
           }}
         >
           {message.text}
         </div>
       ))}
     </div>
     <div style={styles.inputContainer}>
       <input
         style={styles.input}
         type="text"
         value={input}
         onChange={(e) => setInput(e.target.value)}
         onKeyPress={handleKeyPress}
         placeholder="Type a message..."
       />
       <button style={styles.button} onClick={sendMessage}>
         Send
       </button>
     </div>
   </div>
 );
}


const styles = {
 container: {
   display: 'flex',
   flexDirection: 'column',
   height: '100vh',
   justifyContent: 'center',
   alignItems: 'center',
   fontFamily: 'Arial, sans-serif',
 },
 chatBox: {
   width: '300px',
   height: '400px',
   border: '1px solid #ccc',
   borderRadius: '5px',
   padding: '10px',
   display: 'flex',
   flexDirection: 'column',
   overflowY: 'scroll',
   marginBottom: '10px',
 },
 message: {
   padding: '10px',
   borderRadius: '5px',
   margin: '5px 0',
   maxWidth: '80%',
 },
 inputContainer: {
   display: 'flex',
   width: '300px',
 },
 input: {
   flexGrow: 1,
   padding: '10px',
   borderRadius: '5px',
   border: '1px solid #ccc',
 },
 button: {
   padding: '10px',
   borderRadius: '5px',
   border: 'none',
   backgroundColor: '#007BFF',
   color: '#fff',
   cursor: 'pointer',
 },
};


export default App;