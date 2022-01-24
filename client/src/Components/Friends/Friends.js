import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './Friends.module.css'
import { useEffect, useState} from 'react'
import Person from '../Person/Person'

const Friends = () => {
    const myStorage = window.localStorage
    const id = myStorage.getItem('id')

    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            try{

                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends.json')
                const friends = await response.json()

                let friendRequestsArray = []
                let friendsArray = []
                for(let key in friends){
                    if(friends[key].status === 'sentRequest' || friends[key].status === 'receivedRequest'){
                        friendRequestsArray.push(friends[key])
                    }
                    if(friends[key].status === 'accepted'){
                        friendsArray.push(friends[key])
                    }
                }
                
                setFriendRequests(friendRequestsArray)
                setFriends(friendsArray)

            }catch(error){
                console.log(error)
            }


        }

        fetchData()
    }, [])

    return(
        <div>
            <MainNavigation link={'Home'}/>
            <div className={classes.wrapper}>
                <div className={classes.one}>
                    <p className={classes.title}>Friends</p>
                    {friends.map(friend => {
                        return <Person key={friend.id} id={friend.id} firstName={friend.firstName} lastName={friend.lastName} age={friend.age} 
                        city={friend.city} state={friend.state} status={friend.status} image={friend.profilePicture}/>
                    })}
                </div>
                <div className={classes.two}>
                <p className={classes.title}>Friend Requests</p>
                {friendRequests.map(friend => {
                        return <Person key={friend.id} id={friend.id} firstName={friend.firstName} lastName={friend.lastName} age={friend.age} 
                        city={friend.city} state={friend.state} status={friend.status} image={friend.profilePicture}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Friends