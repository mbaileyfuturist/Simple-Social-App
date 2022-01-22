import { useEffect, useState } from 'react'
import Person from '../Person/Person'
import classes from './SearchPeople.module.css'

const SearchPeople = () => {

    const myStorage = window.localStorage
    const searchFriend = myStorage.getItem('friend')
    const [findFriends, setFindFriends] = useState([])

    useEffect(() => {

        const findUsers = async () => {

            try{

                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users.json')
                const users = await response.json()
                
                let findFriendsArray = []
                for(let key in users){
                    const fullName = users[key].firstName + ' ' + users[key].lastName
                    if(fullName === searchFriend){
                        findFriendsArray.push(users[key])
                    }
                }
                setFindFriends(findFriendsArray)

                if(response.status !== 200){
                    throw new Error('Failed to fetch users.')
                }
            }catch(error){
                console.log(error)
            }

        }

        findUsers()

    }, [])

    return(
        <div>
            <p className={classes.title}>Relevent Users</p>
            {findFriends.map(person => {
                return <Person firstName={person.firstName} lastName={person.lastName} address={person.address} city={person.city} state={person.state} age={person.age}/>
            })}

        </div>
    )
}

export default SearchPeople