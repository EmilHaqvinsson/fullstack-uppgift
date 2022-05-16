import {IncomingMessage} from "http"
import {useState, useEffect} from 'react'
import MessageService from '../utils/api/service/MessageService'
import {ReadMessage} from '../utils/interface/IMessage'
import Card from '../components/card/Card'


function MessageView() {
    const [message, setMessage] = useState<Array<ReadMessage>>([])
    const [text, setText] = useState('')

    const postMessage = () => {
        const newMessage = {
            "message": text
        }
        MessageService.createMessage(newMessage)
            .then(response => {
                    setText(response.data)
                    console.log(response.data)
                }
            )
            .catch(error => {
                console.log(error)
            })

    }
    const getAllMessage = () => {
        MessageService.getAllMessages()
            .then(response=> {
                setMessage(response.data)
                console.log(message)
            })
    }

    useEffect(() => {
        getAllMessage()
    }, [])


    return (
        <>
            <h2>MessageView</h2>
            <div>
                <label htmlFor="description"></label>
                <textarea id="description" cols={30} rows={10}
                          onChange={event => setText(event.target.value)}></textarea>
                <button onClick={postMessage}>Post</button>
                <button onClick={getAllMessage}>Get All</button>
            </div>
            {message.map(msg => (
                <Card message={msg.message}/>
            ))}
        </>
    )
}

export default MessageView