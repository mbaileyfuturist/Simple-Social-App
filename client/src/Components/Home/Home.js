import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './Home.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import Post from '../Post/Post'
import Input from '../Input/Input'

const Home = () => {

    let myStorage = window.localStorage
    const id = myStorage.getItem('id')
    let postsArray = []

    const [newPost, setNewPost] = useState(false)
    const [postHeader, setPostHeader] = useState('')
    const [post, setPost] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {

        let id = myStorage.getItem('id')
        
        const fetchData = async () => {
            try{

                const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/posts.json')
                const posts = await response.json()

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

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/posts.json', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    postHeader:postHeader,
                    post:post,
                    id:postHeader
                })
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
            <MainNavigation />
            <div className={classes.container}>
                <div>
                    <p>Want to share something with the world?</p>
                    <Button className={classes.button} value={newPost ? 'Cancel':'Add New Post'} type='button' onClick={toggleNewPost}/>
                    {newPost ? newPostContent : <></>}
                </div>
                <div className={classes.posts}>
                    {posts.map((post, index) => {
                        return <Post key={index} header={post.postHeader} body={post.post} id={post.header}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home