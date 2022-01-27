import { useHistory } from 'react-router-dom'
import classes from './About.module.css'
import Button from '../Button/Button'
import { useState } from 'react'
import axios from 'axios'

const About = () => {
    
    const myStorage = window.localStorage
    const id = myStorage.getItem('id')
    const history = useHistory()
    const [about, setAbout] = useState('')

    const changeAbout = event => {
        setAbout(event.target.value)
    }

    const postAbout = async event => {

        event.preventDefault();
        
        try{

            const response = await axios.post('http://localhost:3001/postAbout', {id:id, about:about})

            history.push('/UploadPhoto')
            
        }catch(error){
            console.log(error)
        }

    }

    return(
        <div>
            <form onSubmit={postAbout} className={classes.aboutContainer}>
                <p className={classes.title}>Tell the world more about yourself. What are your interestes and hobbies?</p>
                <textarea rows='10' onChange={changeAbout}></textarea>
                <div>
                    <Button className={classes.button} value='Continue' type='submit'/>
                </div>
            </form>
        </div>
    )
}

export default About