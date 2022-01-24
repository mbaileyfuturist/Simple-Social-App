import './App.css';
import Authentication from './Components/Authentication/Authentication'
import Home from './Components/Home/Home'
import Friends from './Components/Friends/Friends'
import MessageRoom from './Components/MessageRoom/MessageRoom'
import SearchPeople from './Components/SearchPeople/SearchPeople'
import UploadPhoto from './Components/UploadPhoto/UploadPhoto'
import About from './Components/About/About'
import UserProfile from './Components/UserProfile/UserProfile'
import Messages from './Components/Messages/Messages'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Switch>
        <Route path='/' exact>
          <Authentication />
        </Route>

        <Route path='/About'>
          <About />
        </Route>

        <Route path='/UploadPhoto'>
          <UploadPhoto />
        </Route>

        <Route path='/Home'>
          <Home />
        </Route>

        <Route path='/SearchPeople'>
          <SearchPeople />
        </Route>

        <Route path='/Friends'>
          <Friends />
        </Route>

        <Route path='/Profile:id'>
          <UserProfile />
        </Route>

        <Route path='/Messages'>
          <Messages />
        </Route>

        <Route path='/MessageRoom:id'>
          <MessageRoom />
        </Route>
    </Switch>
  );
}

export default App;
