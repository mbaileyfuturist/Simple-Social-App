import classes from './Post.module.css'
import Button from '../Button/Button'
import axios from 'axios'

const Post = props => {

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const idToken = myStorage.getItem('idToken')

    const deletePost = async () => {
         const response = await axios.post('http://localhost:3001/getPosts', {idToken:idToken, id:id})
         const posts = await response.data

         for(let key in posts){
             if(posts[key].id === props.header){
                 try{

                    const response = await axios.post('http://localhost:3001/deletePost', {
                            idToken:idToken,
                            id:id,
                            key:key
                        })

                    if(response.status !== 200){
                        throw new Error('Failed to delete post.')
                    }
                 }catch(error){
                     console.log(error)
                 }
             }
         }

         window.location.reload()
    }

    return(
        <div className={classes.postContainer}>
            <p className={classes.postHeader}>{props.header}</p>
            <p>{props.body}</p>
            <Button className={classes.button} value='Delete Post' onClick={deletePost}/>
        </div>
    )
}

export default Post