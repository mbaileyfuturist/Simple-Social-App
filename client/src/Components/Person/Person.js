import classes from './Person.module.css'
import Button from '../Button/Button'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Person = props => {

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const history = useHistory()
    const [user, setUser] = useState()
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        
        const fetchUser = async () => {
            
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '.json')
            const user = await response.json()
            setUser(user)
        }

        fetchUser()
    }, [])

    const viewProfile = () => {
        history.push('/Profile:' + props.id)
    }

    const acceptRequest = async () => {
        console.log(props.id)

    try{

        //Set status to accepted for the user that accepted.
        const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends.json')
        const friends = await response.json()

        for(let key in friends){
            if(friends[key].id === props.id){
                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends/' + key + '/status.json', {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify('accepted')
                })
            }
        }

        //Set status to accepted for the corresponding user.
        const responseTwo = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + props.id + '/friends.json')
        const friendsTwo = await responseTwo.json()

        for(let key in friendsTwo){
            if(friendsTwo[key].id === user.id){
                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + props.id + '/friends/' + key + '/status.json', {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify('accepted')
                })
            }
        }


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