import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './UserProfile.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { useParams } from 'react-router-dom'
import Post from '../Post/Post'

const UserProfile = () => {

    let myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const params = useParams()
    const userId = params.id.substring(1)

    const [posts, setPosts] = useState([])
    const [correspondingUser, setCorrespondingUser] = useState({})
    const [loggedInUser, setLoggedInUser] = useState({})
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {

        
        const fetchUser = async () => {
            try{
                
                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '.json')
                const loggedInUser = await response.json()
                setLoggedInUser(loggedInUser)

                if(response.status !== 200){
                    throw new Error('Failed to fetch logged in user.')
                }
            }catch(error){
                console.log(error)
            }
        }

        const fetchCorrespondingUser = async () => {
            try{

                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + userId + '.json')
                const user = await response.json()
                setCorrespondingUser(user)

                let postsArray = []
                const posts = user.posts
                for(let key in posts){
                    postsArray.push(posts[key])
                }

                setPosts(postsArray)

                const imageInfo = user.uploadProfilePicture
                setImageUrl(imageInfo.url)

                if(response.status !== 200){
                    throw new Error('Failed to get posts.')
                }

            }catch(error){
                console.log(error)
            }
        }

        fetchUser()
        fetchCorrespondingUser()
    }, [])

    const sendRequest = async () => {
        //Post the friend request to logged in user
        try{
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends.json', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName:correspondingUser.firstName,
                lastName:correspondingUser.lastName,
                about:correspondingUser.about,
                city:correspondingUser.city,
                state:correspondingUser.state,
                status:'sentRequest',
                profilePicture:correspondingUser.uploadProfilePicture.url,
                age:correspondingUser.age,
                id:correspondingUser.id
            })
        })
        }catch(error){
            console.log(error)
        }

        //Post friend request to corresponding user.
        try{
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + userId + '/friends.json', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName:loggedInUser.firstName,
                lastName:loggedInUser.lastName,
                about:loggedInUser.about,
                city:loggedInUser.city,
                state:loggedInUser.state,
                status:'receivedRequest',
                profilePicture:loggedInUser.uploadProfilePicture.url,
                age:loggedInUser.age,
                id:loggedInUser.id
            })
        })
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <MainNavigation link='Home'/>
            <div className={classes.container}>
                <div className={classes.userInfo}>
                    <img src={imageUrl} />
                    <p className={classes.title}>{correspondingUser.firstName + ' ' + correspondingUser.lastName}</p>
                    <p>{correspondingUser.about}</p>
                    <div className={classes.buttonsContainer}>
                        <Button className={classes.buttonOne} value='Friend Request' onClick={sendRequest}/>
                        <Button className={classes.buttonTwo} value='Message' />
                    </div>
                </div>
                <div className={classes.posts}>
                    {posts.map(post => {
                        return <Post header={post.postHeader} body={post.post}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserProfile