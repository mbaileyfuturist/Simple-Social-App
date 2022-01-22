import classes from './UploadPhoto.module.css'

const UploadPhoto = () => {
    return(
        <div>
            <p className={classes.text}>Greate now that your registered, upload a profile picture so your friends can recognize you.</p>
            
            <div className={classes.imageSelectorContainer}>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
            </div>
        </div>
    )
}

return UploadPhoto