import classes from './MessageRoom.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import MainNavigation from '../MainNavigation/MainNavigation'

const MessageRoom = () => {

    const params = useParams()
    const correspondingId = params.id.substring(1)

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const [messages, setMsssages] = useState([])

    useEffect(() => {
        const getCorrespondingUser = async () => {
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '.json')
            const user = await response.json()

            setUser(user)
        }

        const getMessages = async () => {
            try{
                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/messages/' + correspondingId + '.json')
                const messages = await response.json()

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
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/messages/' + correspondingId + '.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                message:message,
                id:id,
                firstName:user.firstName,
                lastName:user.lastName
                })
            })
        }catch(error){
            console.log(error)
        }

        try{
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + correspondingId + '/messages/' + id + '.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                message:message,
                id:id,
                firstName:user.firstName,
                lastName:user.lastName
                })
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