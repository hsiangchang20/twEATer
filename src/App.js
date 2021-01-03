import './App.css'
import React, { useEffect, useRef, useState } from 'react'
//import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'

import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  MESSAGES_SUBSCRIPTION
} from './graphql'
import { useQuery, useMutation } from 'react-apollo'

function App() {
  //const { status, opened, messages, sendMessage, clearMessages } = useChat()

  const [sendername, setSendername] = useState('')
  const [receivername, setReceivername] = useState('')
  const [body, setBody] = useState('')
  const [loggedin, setLoggedin] = useState(false)

  
  const { loading, error, data , subscribeToMore } = useQuery(MESSAGES_QUERY, {variables: {name: sendername}})
  const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  useEffect(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newMessage = subscriptionData.data.message.data
        console.log(newMessage)

        return {
          ...prev,
          messages: [newMessage, ...prev.messages]
        }
      } 
    })
  }, [subscribeToMore])

  const bodyRef = useRef(null)
  
  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }
  /*
  useEffect(() => {
    displayStatus(status)
  }, [status])
  */
  const login = (
    <div className="App">
      <div className="App-title">
        <h3>Please Enter Your Name to Login</h3>
      </div>
      <Input autoFocus placeholder="Username" onChange={(e) => setSendername(e.target.value)} style={{marginBottom:10}}></Input>
      <Button onClick={() => setLoggedin(true)}>Login</Button>
    </div>
  )

  const chatroom = (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger /*onClick={clearMessages}*/>
          Clear
        </Button>
      </div>
      <h2>Username : {sendername}</h2>
      <div className="App-messages">
        {loading ? (
            <p style={{color:'#ccc'}}>Loading...</p>
          ) : error ? (
            <p style={{color:'#ccc'}}>Error!</p>
          ) : data.messages.length === 0 ? (
            <p style={{color:'#ccc'}}>No message...</p>
          ) : (
          data.messages.map(({ sender, receiver, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{sender}</Tag>to <Tag color="blue">{receiver}</Tag>:  {body}
            </p>
          ))
        )}
      </div>
      <Input
        placeholder="Username"
        onChange={(e) => setReceivername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !receivername) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          
          addMessage({
            variables : {
              sender:sendername,
              receiver: receivername,
              body:body
            }
          })
          setBody('')
        }}
      ></Input.Search>
    </div>
  )

  return loggedin ? chatroom : login
}

export default App
