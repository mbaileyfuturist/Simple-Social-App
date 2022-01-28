import classes from './Person.module.css'
import Button from '../Button/Button'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Person = props => {

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const idToken = myStorage.getItem('idToken')

    const history = useHistory()
    const [user, setUser] = useState()
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        
        const fetchUser = async () => {
            
            const response = await axios.post('http://localhost:3001/getUser', {idToken:idToken, id:id})
            const user = await response.data
            setUser(user)
        }

        fetchUser()
    }, [])

    const viewProfile = () => {
        history.push('/Profile:' + props.id)
    }

    const acceptRequest = async () => {

        try{

            //Set status to accepted for the user that accepted.
            const response = await axios.post('http://localhost:3001/getFriends', {idToken:idToken, id:id})
            const friends = await response.data

            for(let key in friends){
                if(friends[key].id === props.id){
                    const response = await axios.post('http://localhost:3001/updateStatus', {
                        idToken:idToken,
                        id:id,
                        key:key,
                        status:'accepted'})
                }
            }

            //Set status to accepted for the corresponding user.
            const responseTwo = await axios.post('http://localhost:3001/getFriends', {idToken:idToken, id:props.id})
            const friendsTwo = await responseTwo.data

            for(let key in friendsTwo){
                if(friendsTwo[key].id === user.id){
                    const response = await axios.put('http://localhost:3001/updateStatus', {
                            idToken:idToken,
                            id:props.id,
                            key:key,
                            status:'accepted'})
                }
            }

            window.location.reload()

        }catch(error){
            console.log(error)
        }

    }

    const navigateToMessageRoom = async () => {
        history.push('/MessageRoom:' + props.id)
    }

    return(
        <div className={classes.personContainer}>
            <div className={classes.userInfo}>
                <img src={props.image} />
                <p>{props.firstName + ' ' + props.lastName}</p>
                <p>Age: {props.age}</p>
                <p>{props.city + ' ' + props.state}</p>
            </div>

            <div className={classes.buttonsContainer}>
                {status === 'viewing' && <Button className={classes.buttonOne} value='View Profile' onClick={viewProfile}/>}
                {status === 'sentRequest' && <Button disabled={true} className={classes.buttonOne} value='Request Pending'/>}
                {status === 'receivedRequest' && <Button className={classes.buttonOne} value='Accept Request' onClick={acceptRequest}/>}
                {status === 'accepted' && <Button className={classes.buttonOne} value='Message' onClick={navigateToMessageRoom}/>}
            </div>
        </div>
    )
}

export default Person