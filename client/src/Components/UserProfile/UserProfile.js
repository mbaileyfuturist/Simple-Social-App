import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './UserProfile.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { useParams, useHistory } from 'react-router-dom'
import Post from '../Post/Post'
import axios from 'axios'

const UserProfile = props => {

    let myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const idToken = myStorage.getItem('idToken')

    const params = useParams()
    const history = useHistory()
    const userId = params.id.substring(1)

    const [posts, setPosts] = useState([])
    const [correspondingUser, setCorrespondingUser] = useState({})
    const [loggedInUser, setLoggedInUser] = useState({})
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {

        
        const fetchUser = async () => {
            try{
                
                const response = await axios.post('http://localhost:3001/getUser', {idToken:idToken, id:id})
                const loggedInUser = await response.data
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

                const response = await axios.post('http://localhost:3001/getUser', {idToken:idToken, id:userId})
                const user = await response.data
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
            const response = await axios.post('http://localhost:3001/addFriend', {
                idToken:idToken,
                paramId:id,
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
        }catch(error){
            console.log(error)
        }

        //Post friend request to corresponding user.
        try{
            const response = await axios.post('http://localhost:3001/addFriend', {
                idToken:idToken,
                paramId:userId,
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
        }catch(error){
            console.log(error)
        }
    }

    const navigateToMessageRoom = async () => {
        history.push('MessageRoom:' + props.id)
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
                        <Button className={classes.buttonTwo} value='Message' onClick={navigateToMessageRoom}/>
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