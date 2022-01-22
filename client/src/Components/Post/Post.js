import classes from './Post.module.css'
import Button from '../Button/Button'

const Post = props => {

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')

    const deletePost = async () => {
         const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/posts.json')
         const posts = await response.json()

         for(let key in posts){
             console.log(posts[key])
             if(posts[key].id === props.header){
                 try{

                    const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/posts/' + key + '.json', {
                        method:'DELETE',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:null
                    })
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