import classes from './UploadPhoto.module.css'
import { useState } from 'react'
import Button from '../Button/Button'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebase'
import { useHistory } from 'react-router-dom'


const UploadPhoto = () => {

    const history = useHistory()

    const myStorage = window.localStorage
    const id = myStorage.getItem('id')

    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [uploaded, setUploaded] = useState(false)

    const previewImage = event => {
        event.preventDefault();
        
        //This will grab our file from the input event
        const file = event.target[0].files[0]
        setImage(URL.createObjectURL(file))
        setFile(file)
    }

    
    const uploadImage = () => {

        //If file doesnt exist then do nothing.
        if(!file) return
    
        if(file){
        
            //ref sets up the storage mechanism and the path to the file.
            const storageRef = ref(storage, '/files/' + file.name)
        
            //uploadBytesResumable uploads data to the objects location.
            const uploadTask = uploadBytesResumable(storageRef, file)
        
            uploadTask.on('state_changed', (snapShot) => {
                //Show the progress of the uploaded image
                const progress = Math.round((snapShot.bytesTransferred / snapShot.totalBytes)*100)
                setProgress(progress)
            }, 
            //If an error occures during upload, then show the error.
            error => console.log(error),
            () => {
                //This gets triggered when the download is successfully completed.
                //The parameter takes the path of the file we want to download.
                //The url being returned is the url, that we will need to present the photo to the user.
                //We will need to store this under the appropriate user in our realtime database.
                const url = getDownloadURL(uploadTask.snapshot.ref).then(url => putUrlToUser(url))
            })
        }
    }

    const putUrlToUser = async (url) => {
        setUploaded(true)
        const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/uploadProfilePicture.json',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:id, url:url
            })
        })
        
        if(response.status !== 200){
            throw new Error('Failed to upload data.')
        }

    }

    const navigateHome = () => {
        history.push('/Home')
    }


    return(
        <div>
            <p className={classes.text}>Greate now that your registered, upload a profile picture so your friends can recognize you.</p>
            
            <form onSubmit={previewImage} className={classes.imageSelectorContainer}>
                <input className={classes.input} type="file" id="avatar" name="avatar"/>
                <Button className={classes.button} value='Preview' type='submit' />
            </form>
            <div className={classes.imageContainer}>
                {image ? (
                    <div>
                        <img className={classes.previewImage} src={image}/>
                        <div className={classes.buttonContainer}>
                            <Button className={classes.button} value='Upload' onClick={uploadImage}/>
                        </div>

                        {progress ? <h4 className={classes.uploadProgress}>Upload progress: {progress}%</h4> : <></>}

                        <div className={classes.buttonContainer}>
                        {<Button className={classes.greenButton} disabled={!uploaded} type='click' onClick={navigateHome} value='Continue'/>}
                        </div>
                    </div>
                ) : <></>}
            </div>
        </div>
    )
}

export default UploadPhoto