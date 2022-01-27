import { useEffect } from 'react'
import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './Messages.module.css'
import { useState } from 'react'
import MessageCard from '../MessageCard/MessageCard'
import axios from 'axios'

const Messages = props => {

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    //Message room in this case is represented by the first message.
    const [messageRooms, setMessageRooms] = useState([])

    useEffect(() => {

       const fetchData = async () => {
            try{

                const response = await axios.post('http://localhost:3001/getMessageRooms', {
                    id:id,
                })
                const messages = await response.data

                let messagesArray = []
                let lastMessages = []
                //Iterate through each room.
                for(let key in messages){
                    const message = messages[key]
                    //Iterate through each message in the room.
                    for(let key in message){
                        messagesArray.push(message[key])
                    }
                    //Get the last message and store it.
                    const lastIndex = messagesArray.length - 1
                    lastMessages.push(messagesArray[lastIndex])
                }

                setMessageRooms(lastMessages)

            }catch(error){
                console.log(error)
            }
       }

       fetchData()
    }, [])

    return(
        <div>
            <MainNavigation link='Home'/>
            <div className={classes.messagesContainer}>
                <p className={classes.title}>Recent Messages</p>
                {messageRooms.map(messageRoom => {
                    return <MessageCard key={messageRoom.id} id={messageRoom.id} firstName={messageRoom.firstName} 
                            lastName={messageRoom.lastName} lastMessage={messageRoom.message}/> 
                })}
            </div>
        </div>
    )
}

export default Messages