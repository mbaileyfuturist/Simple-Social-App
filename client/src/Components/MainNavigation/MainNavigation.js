import classes from './MainNavigation.module.css'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const MainNavigation = () => {

    const history = useHistory()
    let myLocalStorage = window.localStorage
    const [friend, setFriend] = useState('')
    
    const searchFriend = event => {
        setFriend(event.target.value)
    }

    const navigate = async () => {
        myLocalStorage.setItem('friend', friend)
        setFriend('')
        history.push('/SearchPeople')
    }

    const logOut = () => {
        myLocalStorage.removeItem('id')
        history.push('/')
    }

    return(
        <div className={classes.header}>
            <div className={classes.one}>
                <p className={classes.navLink}>Friends</p>
            </div>
            <div className={classes.two}>
                <Input type='text' className={classes.input} placeholder='find friends' onChange={searchFriend}/>
                <Button className={classes.button} value='search' onClick={navigate}/>
            </div>
            <div className={classes.three}>
                <p className={classes.navLink}>Messages</p>
            </div>
            <div className={classes.four}>
                <p className={classes.navLink} onClick={logOut}>Logout</p>
            </div>
        </div>
    )
}

export default MainNavigation