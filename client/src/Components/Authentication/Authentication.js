import Input from '../Input/Input'
import Button from '../Button/Button'
import classes from './Authentication.module.css'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Authenticaion = () => {

    let myStorage = window.localStorage;
    const history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [existingUser, setExistingUser] = useState(true)
    const [age, setAge] = useState(0)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const changeFirstName = event => {
        setFirstName(event.target.value)
    }

    const changeLastName = event => {
        setLastName(event.target.value)
    }

    const changeEmail = event => {
        setEmail(event.target.value)
    }

    const changeUserName = event => {
        setUserName(event.target.value)
    }

    const changePassword = event => {
        setPassword(event.target.value)
    }

    const toggleExistingUser = () => {
        setExistingUser(!existingUser)
    }

    const changeAge = event => {
        setAge(event.target.value)
    }
    const changeAddress = event => {
        setAddress(event.target.value)
    }

    const changeCity = event => {
        setCity(event.target.value)
    }

    const changeState = event => {
        setState(event.target.value)
    }

    const signup = async event => {

        event.preventDefault();

        try{

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5eOtGz1_1mGPZ_xyuvIF0UHXCiFtnn60', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    password:password,
                    returnSecureToken:true
                })
            })
            const data = await response.json()

            //If token, then post new user and navigate to upload photo.
            if(data.idToken){

                myStorage.setItem('idToken', data.idToken)

                //Post the new user
                try{

                    const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users.json', {
                        method:'POST',
                        headers:{

                        },
                        body:JSON.stringify({
                            firstName:firstName,
                            lastName:lastName,
                            email:email,
                            userName:userName,
                            password:password,
                            id:1,
                            posts:1,
                            address:address,
                            city:city,
                            state:state,
                            age:age
                        })
                    })

                    if(response.status !== 200){
                        throw new Error('Failed to post new user.')
                    }

                }catch(error){
                    console.log(error)
                }

                //Update the new user with the id provided by google.
                let userWithId = {}
                try{

                    const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users.json')
                    const users = await response.json()

                    for(let key in users){
                        if(users[key].email === email){
                            userWithId = {
                               ... users[key],
                               id:key
                            }

                            myStorage.setItem('id', key)
                        }
                    }

                    console.log(userWithId)

                    //Update that new user.
                    const responseTwo = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + userWithId.id + '/id.json', { 
                        method:'PUT',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(userWithId.id)
                        })

                    if(responseTwo.status !== 200){
                        throw new Error('Failed to update new user.')
                    }

                    //Navigate to upload photo.
                    history.push('/About')

                }catch(error){
                    console.log(error)
                }

            }else{
                //Set error
            }

        }catch(error){
            console.log(error)
        }
        
    }

    const login = async event => {

        event.preventDefault()

        try{

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5eOtGz1_1mGPZ_xyuvIF0UHXCiFtnn60', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },    
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
            })

            const data = await response.json()

        //If token, then navigat to the home component.
        if(data.idToken){

            try{

                const usersResponse = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users.json')
                const users = await usersResponse.json()

                for(let key in users){
                    if(users[key].email === email){
                        myStorage.setItem('id', users[key].id)
                    }
                }

                myStorage.setItem('idToken', data.idToken)
                history.push('/Home')
            }catch(error){
                console.log(error)
            }
        }else{
            //Set error
        }

        }catch(error){
            console.log(error)
        }


    }

    const signUpForm = (
        <form className={classes.formContainer} onSubmit={signup}>
            <div className={classes.formHeader}>
                <p className={classes.formTitle}>Sign Up</p>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='text' value={firstName} onChange={changeFirstName} placeholder='first name'/>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='text' value={lastName} onChange={changeLastName} placeholder='last name'/>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='number' value={age} onChange={changeAge} placeholder='age' placeholder='age'/>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='text' value={address} onChange={changeAddress} placeholder='address'/>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='text' value={city} onChange={changeCity} placeholder='city'/>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='text' value={state} onChange={changeState} placeholder='state'/>
            </div>

            <div className={classes.inputContainer}>
                <Input className={classes.input} type='email' value={email} onChange={changeEmail} placeholder='email'/>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='text' value={userName} onChange={changeUserName} placeholder='username'/>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='password' value={password} onChange={changePassword} placeholder='password'/>
            </div>

            <div className={classes.buttonContainer}>
                <Button className={classes.button}  value='submit' type='submit'/>
            </div>
            <p onClick={toggleExistingUser} className={classes.subText}>Already an existing user? Login here.</p>
        </form>
    )

    const logInForm = (
        <form className={classes.formContainer} onSubmit={login}>
            <div className={classes.formHeader}>
                <p className={classes.formTitle}>Log In</p>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='email' value={email} onChange={changeEmail} placeholder='email'/>
            </div>
            <div className={classes.inputContainer}>
                <Input className={classes.input} type='password' value={password} onChange={changePassword} placeholder='password'/>
            </div>

            <div className={classes.buttonContainer}>
                <Button className={classes.button} value='submit' type='submit'/>
            </div>
            <p onClick={toggleExistingUser} className={classes.subText}>Dont have an account? Click here to create one.</p>
        </form>
    )

    return(
        existingUser ? logInForm : signUpForm
    )
}

export default Authenticaion