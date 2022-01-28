import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './Home.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import Post from '../Post/Post'
import Input from '../Input/Input'
import axios from 'axios'

const Home = () => {

    let myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const idToken = myStorage.getItem('idToken')
    let postsArray = []

    const [newPost, setNewPost] = useState(false)
    const [postHeader, setPostHeader] = useState('')
    const [post, setPost] = useState('')
    const [posts, setPosts] = useState([])
    const [imageUrl, setImageUrl] = useState()


    useEffect(() => {
        
        const fetchData = async () => {

            //Get the profile picture.
            try{
                const response = await axios.post('http://localhost:3001/getProfilePicture', {idToken:idToken, id:id})

                const image = await response.data

                setImageUrl(image)
                
            }catch(error){
                console.log(error)
            }
            //Get the posts.
            try{

                const response = await axios.post('http://localhost:3001/getPosts', {idToken:idToken, id:id})
        
                const posts = await response.data


                for(let key in posts){
                    postsArray.push(posts[key])
                }

                setPosts(postsArray)

                if(response.status !== 200){
                    throw new Error('Failed to get posts.')
                }

            }catch(error){

            }
        }

        fetchData()
    }, [])

    const changePostHeader = event => {
        setPostHeader(event.target.value)
    }

    const changePost = event => {
        setPost(event.target.value)
    }

    const toggleNewPost = () => {
        setNewPost(!newPost)
    }

    const uploadPost = async event => {

        event.preventDefault();
        toggleNewPost()
        
        try{

            const response = await axios.post('http://localhost:3001/uploadPost',{
                    postHeader:postHeader,
                    post:post,
                    id:id,
                    idToken:idToken
                })

            if(response.status !== 200){
                throw new Error('Failed to upload new post.')
            }

            window.location.reload()

        }catch(error){
            console.log(error)
        }

    }

    const newPostContent = (
        <form onSubmit={uploadPost} className={classes.uploadPost}>
            <div className={classes.inputContainer}>   
                <Input className={classes.input} placeholder='Post Header' onChange={changePostHeader}/>
            </div>
            <div className={classes.textAreaContainer}>
                <textarea placeholder='Something I want to share...' rows='10' onChange={changePost}/>
            </div>
            <div className={classes.postButtonContainer}>
            <Button className={classes.button} value='Post' type='submit'/>
            </div>
        </form>
    )

    return(
        <div>
            <MainNavigation link={'Friends'}/>
            <div className={classes.container}>
                <img src={imageUrl} />
                <div>
                    <p>Want to share something with the world?</p>
                    <Button className={classes.button} value={newPost ? 'Cancel':'Add New Post'} type='button' onClick={toggleNewPost}/>
                    {newPost ? newPostContent : <></>}
                </div>
                <div className={classes.posts}>
                    {posts.map((post, index) => {
                        return <Post key={index} header={post.postHeader} body={post.post} id={post.postHeader}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home