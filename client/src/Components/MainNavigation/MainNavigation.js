import classes from './MainNavigation.module.css'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const MainNavigation = props => {

    const history = useHistory()
    let myLocalStorage = window.localStorage
    const [friend, setFriend] = useState('')

    const dynamicNavigation = () => {

        if(props.link === 'Home'){
            history.push('/Home')
        }else if(props.link === 'Friends'){
            history.push('/Friends')
        }

    }

    const viewMessages = () => {
        history.push('/Messages')
    }
    
    const searchFriend = event => {
        setFriend(event.target.value)
    }

    const navigate = async () => {
        myLocalStorage.setItem('friend', friend)
        history.push('/SearchPeople')
        window.location.reload()
    }

    const logOut = () => {
        myLocalStorage.removeItem('id')
        history.push('/')
    }

    return(
        <div className={classes.header}>
            <div className={classes.one}>
                <p className={classes.navLink} onClick={dynamicNavigation}>{props.link}</p>
            </div>
            <div className={classes.two}>
                <Input type='text' className={classes.input} placeholder='find friends' onChange={searchFriend}/>
                <Button className={classes.button} value='search' onClick={navigate}/>
            </div>
            <div className={classes.three}>
                <p className={classes.navLink} onClick={viewMessages}>Messages</p>
            </div>
            <div className={classes.four}>
                <p className={classes.navLink} onClick={logOut}>Logout</p>
            </div>
        </div>
    )
}

export default MainNavigation