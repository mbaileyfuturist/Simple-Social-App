import Button from '../Button/Button'
import classes from './MessageCard.module.css'
import { useHistory } from 'react-router-dom'

const MessageCard = props => {

    const history = useHistory()

    const navigateToMessageRoom = () => {
        history.push('/MessageRoom:' + props.id)
    }

    return(
        <div className={classes.cardContainer}>
            <p className={classes.title}>{props.firstName + ' ' + props.lastName}</p>
            <p>{props.lastMessage}</p>
            <Button className={classes.button} value='View Message' onClick={navigateToMessageRoom}/>
        </div>
    )
}

export default MessageCard