import { useEffect, useState } from 'react'
import Person from '../Person/Person'
import classes from './SearchPeople.module.css'
import MainNavigation from '../MainNavigation/MainNavigation'

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
                        const copyUser = {
                            ...users[key],
                            status:'viewing'
                        }
                        console.log(copyUser)
                        findFriendsArray.push(copyUser)
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
            <MainNavigation link={'Home'}/>
            <p className={classes.title}>Relevent Users</p>
            {findFriends.map(person => {
                return <Person key={person.id} id={person.id} firstName={person.firstName} lastName={person.lastName} 
                address={person.address} city={person.city} state={person.state} age={person.age} image={person.uploadProfilePicture.url} status={person.status}/>
            })}
        </div>
    )
}

export default SearchPeople