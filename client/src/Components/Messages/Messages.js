import { useEffect } from 'react'
import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './Messages.module.css'
import { useState } from 'react'
import MessageCard from '../MessageCard/MessageCard'

const Messages = () => {

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const [messageRooms, setMessageRooms] = useState([])

    useEffect(() => {

       const fetchData = async () => {
            try{

                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/messages.json')
                const messages = await response.json()

                //Grab the rooms.
                let messageRoomsArray = []
                for(let key in messages){
                    console.log(messages[key])
                }


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
                {messageRooms.map(messageRoom => {
                    return <MessageCard firstName={messageRoom.firstName} lastName={messageRoom.lastName}/> 
                })}
            </div>
        </div>
    )
}

export default Messages