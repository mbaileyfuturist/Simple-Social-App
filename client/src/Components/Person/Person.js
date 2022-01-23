import classes from './Person.module.css'
import Button from '../Button/Button'

const Person = props => {

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')

    const addFriend = async () => {

        try{
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends.json', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    firstName:props.firstName,
                    lastName:props.lastName,
                    age:props.age,
                    id:props.id
                })
            })
           
            if(response.status !== 200){
                throw new Error('Failed to add friend.')
            }

        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={classes.personContainer}>
            <p>{props.firstName + ' ' + props.lastName}</p>
            <p>Age: {props.age}</p>
            <p>{props.address + ' ' + props.city + ' ' + props.state}</p>

            <div className={classes.buttonsContainer}>
                <Button className={classes.buttonOne} value='Add Friend' onClick={addFriend}/>
                <Button className={classes.buttonTwo} value='Message'/>
            </div>
        </div>
    )
}

export default Person