import classes from './Person.module.css'
import Button from '../Button/Button'
import { useHistory } from 'react-router-dom'

const Person = props => {

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const history = useHistory()

    const viewProfile = () => {
        history.push('/Profile:' + props.id)
    }

    const acceptRequest = async () => {

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends.json')
            const friends = await response.json()

            for(let key in friends){
                if(friends[key].id === props.id){
                    try{
                        
                        const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends/status.json', {
                            method:'PUT',
                            headers:{
                                'Content-type':'application/json'
                            },
                            body:JSON.stringify('accepted')
                        })


                    }catch(error){
                        console.log(error)
                    }
                }
            }

        }catch(error){  
            console.log(error)
        }

    }

    const message = async () => {

    }

    return(
        <div className={classes.personContainer}>
            <div className={classes.userInfo}>
                <img src={props.image} />
                <p>{props.firstName + ' ' + props.lastName}</p>
                <p>Age: {props.age}</p>
                <p>{props.address + ' ' + props.city + ' ' + props.state}</p>
            </div>

            <div className={classes.buttonsContainer}>
                {props.status === 'viewing' && <Button className={classes.buttonOne} value='View Profile' onClick={viewProfile}/>}
                {props.status === 'requested' && <Button className={classes.buttonOne} value='Accept Request' onClick={acceptRequest}/>}
                {props.status === 'accepted' && <Button className={classes.buttonOne} value='Message' onClick={message}/>}
            </div>
        </div>
    )
}

export default Person