import { useHistory } from 'react-router-dom'
import classes from './About.module.css'
import Button from '../Button/Button'

const About = () => {
    
    const myStorage = window.localstorage
    const id = myStorage.getItem('id')
    const history = useHistory()

    const navigateToUploadPhoto = () => {
        history.push('/UploadPhoto')
    }

    return(
        <div>
            <form onSubmit={navigateToUploadPhoto} className={classes.aboutContainer}>
                <p className={classes.title}>Tell the world more about yourself. What are your interestes and hobbies?</p>
                <textarea rows='10'>

                </textarea>
                <Button value='Continue' type='submit'/>
            </form>
        </div>
    )
}

export default About