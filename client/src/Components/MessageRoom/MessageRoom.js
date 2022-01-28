import classes from './MessageRoom.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import MainNavigation from '../MainNavigation/MainNavigation'
import axios from 'axios'

const MessageRoom = () => {

    const params = useParams()
    const correspondingId = params.id.substring(1)

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const idToken = myStorage.getItem('idToken')
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const [messages, setMsssages] = useState([])

    useEffect(() => {
        const getCorrespondingUser = async () => {
            const response = await axios.post('http://localhost:3001/getCorrespondingUser', {idToken:idToken, id:correspondingId})
            const user = await response.data

            setUser(user)
        }

        const getMessages = async () => {
            try{
                const response = await axios.post('http://localhost:3001/getMessages', {
                    id:id,
                    correspondingId:correspondingId,
                    idToken:idToken
                })
                const messages = await response.data

                let messageStack = []
                for(let key in messages){
                  messageStack.push(messages[key])
                }

                setMsssages(messageStack)

            }catch(error){
                console.log(error)
            }
        }

        getCorrespondingUser()

        setInterval(() => {
            getMessages()
        }, 3000)

    }, [])

    const changeMessage = event => {
        setMessage(event.target.value)
    }

    const sendMessage = async event => {

        event.preventDefault();
        
        try{
            const response = await axios.post('http://localhost:3001/postMessageToUser',{
                message:message,
                id:id,
                idToken:idToken,
                correspondingId:correspondingId,
                firstName:user.firstName,
                lastName:user.lastName
                })
        }catch(error){
            console.log(error)
        }

        try{
            const response = await axios.post('http://localhost:3001/postMessageToCorrespondingUser',{
                message:message,
                id:id,
                idToken:idToken,
                correspondingId:correspondingId,
                firstName:user.firstName,
                lastName:user.lastName
                })
        }catch(error){
            console.log(error)
        }

        setMessage('')
    }

    return(
        <div>
            <MainNavigation link='Home' />
            <div className={classes.messagesWrapper}>
                {messages.map(object => {
                    return object.id ===id ? <p className={classes.message}>{object.message + ': ' + object.firstName}</p> 
                    : <p className={classes.correspondingMessage}>{object.firstName + ': ' + object.message}</p>
                })}
            </div>
            <form onSubmit={sendMessage} className={classes.formWrapper}>
                <div className={classes.one}>
                    <input className={classes.input} type='text' onChange={changeMessage} value={message}/>
                </div>
                <div className={classes.two}>
                    <Button  className={classes.button} value='Send' type='submit'/>
                </div>
            </form>
        </div>
    )
}

export default MessageRoom