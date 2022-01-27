const port = process.env.PORT || 3001;
const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.json())
app.use(cors())

    app.post('/signup', async (req, res) => {
        
        try{

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5eOtGz1_1mGPZ_xyuvIF0UHXCiFtnn60',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:req.body.email,
                password:req.body.password,
                returnSecureToken:req.body.returnSecureToken
                })
            } )

            const data = await response.json()

            if(response.status !== 200){
                throw new Error('Failed to sign up user.')
            }

            res.send(data)

        }catch(error){
            console.log(error)
        }

    })
    
    app.post('/login', async (req, res) => {
        
        const email = req.body.email
        const password = req.body.password
        const returnSecureToken = req.body.returnSecureToken

       try{

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5eOtGz1_1mGPZ_xyuvIF0UHXCiFtnn60', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken: returnSecureToken
            })
        })

        const data = await response.json()

        if(response.status !== 200){
            throw new Error('Failed to authenticate user.')
        }
        
        res.send(data)

       }catch(error){
           console.log(error)
       }

    })
    
    app.post('/postAbout', async (req, res) => {

        const id = req.body.id
        const about = req.body.about

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/about.json', {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(about)
            }) 

            if(response.status !== 200){
                throw new Error('Failed to post about.')
            }

            res.sendStatus(response.status)
        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/uploadPhoto', async (req, res) => {

        const id = req.body.id

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/uploadProfilePicture.json', {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:req.body.id,
                url:req.body.url
            })
            })

            if(response.status !== 200){
                throw new Error('Failed to upload photo.')
            }

            response.sendStatus(response.status)
        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/getProfilePicture', async (req, res) => {

        const id = req.body.id
        
        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/uploadProfilePicture/url.json')
            const data = await response.json()
             
            if(response.status !== 200){
                throw new Error('Failed to fetch profile picture.')
            }

            res.send(data)

        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/getPosts', async (req, res) => {

        const id = req.body.id

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/posts.json')
            const data = await response.json()

            if(response.status !== 200){
                throw new Error('Failed to fetch posts.')
            }

            res.send(data)
        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/uploadPost', async (req, res) => {

        const id = req.body.id

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/posts.json', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    postHeader:req.body.postHeader,
                    post:req.body.post,
                    id:req.body.postHeader
                })
            })

            res.sendStatus(response.status)
        }catch(error){
            console.log(error)
        }
    })

    app.post('/getCorrespondingUser', async (req, res) => {

        const id = req.body.id

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '.json')
            const data = await response.json()

            if(response.status !== 200){
                throw new Error('Failed to get corresponding user.')
            }

            res.send(data)

        }catch(error){
            console.log(error)
        }
    })

    app.post('/getMessageRooms', async (req, res) => {

        const id = req.body.id

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/messages.json')
            const data = await response.json()
            
            if(response.status !== 200){
                throw new Error('Failed to get messages')
            }

            res.send(data)

        }catch(error){
            console.log(error)
        }
    })

    app.post('/getMessages', async (req, res) => {

        const id = req.body.id
        const correspondingId = req.body.correspondingId

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/messages/' + correspondingId + '.json')
            const data = await response.json()
            
            if(response.status !== 200){
                throw new Error('Failed to get messages')
            }

            res.send(data)

        }catch(error){
            console.log(error)
        }
    })

    app.post('/postMessageToUser', async (req, res) => {

        const id = req.body.id
        const correspondingId = req.body.correspondingId

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/messages/' + correspondingId + '.json', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    message:req.body.message,
                    id:req.body.id,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName
                })
            })

            if(response.status !== 200){
                throw new Error('Failed to post message to user.')
            }

            res.sendStatus(response.status)

        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/postMessageToCorrespondingUser', async (req, res) => {

        const id = req.body.id
        const correspondingId = req.body.correspondingId

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + correspondingId + '/messages/' + id + '.json',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    message:req.body.message,
                    id:req.body.id,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName
                })
            })

            if(response.status !== 200){
                throw new Error('Failed to post message to corresponuser.')
            }

            res.sendStatus(response.status)

        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/getFriends', async (req, res) => {

        const id = req.body.id

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends.json')
            const data = await response.json()

            if(response.status !== 200){
                throw new Error('Failed to get friends.')
            }
            
            res.send(data)

        }catch(error){
            console.log(error)
        }
    })

    app.post('/updateStatus', async (req, res) => {

        const id = req.body.id
        const key = req.body.key
        const status = req.body.status
        
        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends/' + key + '/status.json',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(status)
            })

            if(response.status !== 200){
                throw new Error('Failed to update friend status.')
            }

            res.sendStatus(response.status)

        }catch(error){
            console.log(error)
        }
    })

    app.post('/getUser', async (req, res) => {
        
        const userId = req.body.id

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + userId + '.json')
            const data = await response.json()

            if(response.status !== 200){
                throw new Error('Failed to get user')
            }

            res.send(data)

        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/addFriend', async (req, res) => {

        const id = req.body.paramId

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/friends.json', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    about:req.body.about,
                    city:req.body.city,
                    state:req.body.state,
                    status:req.body.status,
                    profilePicture:req.body.profilePicture,
                    age:req.body.age,
                    id:req.body.id
                })
            })

            res.sendStatus(response.status)

        }catch(error){
            console.log(error)
        }
    })

    app.get('/getUsers', async (req, res) => {
       try{
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users.json')
            const data = await response.json()

            if(response.status !== 200){
                throw new Error('Failed to fetch users.')
            }
            res.send(data)
       }catch(error){
           console.log(error)
       }
    })
    
    app.post('/getPosts', async (req, res) => {

        const id = req.body.id

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/posts.json')
            const data = await response.json()

            if(response.status !== 200){
                throw new Error('Failed to delete post.')
            }

            res.send(data)

        }catch(error){
            console.log(error)
        }
    })

    app.post('/deletePost', async (req, res) => {

        const id = req.body.id
        const key = req.body.key

        try{

            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/posts/' + key + '.json',{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                body:null
            })

            res.sendStatus(response.status)
        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/getMessages', async (req, res) => {

        const id = req.body.id 

        try{
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/messages.json')
            const data = await response.json()

            if(response.status !== 200){
                throw new Error('Failed to fetch messages.')
            }

            res.send(data)
        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/addUser', async (req, res) => {

        try{
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users.json', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                userName:req.body.userName,
                password:req.body.password,
                id:1,
                posts:1,
                about:1,
                uploadProfilePicture:1,
                address:req.body.address,
                city:req.body.city,
                state:req.body.state,
                age:req.body.age
            })
        })

        res.sendStatus(response.status)
        }catch(error){
            console.log(error)
        }
    })
    
    app.post('/updateUser', async (req, res) => {

        const id = req.body.id

        try{
            const response = await fetch('https://social-media-application-e63b9-default-rtdb.firebaseio.com/Users/' + id + '/id.json', {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(id)
            })

            res.sendStatus(response.status)
        }catch(error){
            console.log(error)
        }
    })

    // All other GET requests not handled before will return our React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

app.listen(port, () => {
    console.log('Server running on port ' + port)
})