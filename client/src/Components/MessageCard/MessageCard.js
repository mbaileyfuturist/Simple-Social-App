import Button from '../Button/Button'
import classes from './MessageCard.module.css'

const MessageCard = props => {

    return(
        <div>
            <p>{props.firstName + ' ' + props.lastName}</p>
            <Button className={classes.button} value='View Message'/>
        </div>
    )
}

export default MessageCard