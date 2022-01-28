import { useEffect, useState } from 'react'
import Person from '../Person/Person'
import classes from './SearchPeople.module.css'
import MainNavigation from '../MainNavigation/MainNavigation'
import axios from 'axios'

const SearchPeople = () => {

    const myStorage = window.localStorage
    const idToken = myStorage.getItem('idToken')
    const searchFriend = myStorage.getItem('friend')
    const [findFriends, setFindFriends] = useState([])

    useEffect(() => {

        const findUsers = async () => {

            try{

                const response = await axios.post('http://localhost:3001/getUsers', {idToken:idToken})
                const users = await response.data
                
                let findFriendsArray = []
                for(let key in users){
                    const fullName = users[key].firstName + ' ' + users[key].lastName
                    if(fullName === searchFriend){
                        const copyUser = {
                            ...users[key],
                            status:'viewing'
                        }
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

    }, [searchFriend])

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