import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './Messages.module.css'

const Messages = () => {

    return(
        <div>
            <MainNavigation link='Home'/>
            <div className={classes.messagesContainer}>

            </div>
        </div>
    )
}

export default Messages