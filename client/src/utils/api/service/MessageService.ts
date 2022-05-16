import http from '../MyApi'
import {CreateMessage} from '../../interface/IMessage'

const MessageService = {
    createMessage: (newMessage: CreateMessage) => {
        return http.post('/message', newMessage)
    }
}

export default MessageService