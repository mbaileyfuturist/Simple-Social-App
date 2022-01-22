import './App.css';
import Authentication from './Components/Authentication/Authentication'
import Home from './Components/Home/Home'
import Friends from './Components/Friends/Friends'
import MessageRoom from './Components/MessageRoom/MessageRoom'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Switch>
        <Route path='/' exact>
          <Authentication />
        </Route>

        <Route path='/Home'>
          <Home />
        </Route>

        <Route path='/Friends'>
          <Friends />
        </Route>

        <Route path='/MessageRoom:id'>
          <MessageRoom />
        </Route>
    </Switch>
  );
}

export default App;
