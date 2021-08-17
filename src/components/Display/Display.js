import './Display.css'
import DisplayHeader from './DisplayHeader';
import CreateWork from '../CreateWork/CreateWork';
import WorkCardsGrid from './WorkCardsGrid';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import FocusedWork from '../FocusedWork/FocusedWork';
import Settings from '../Settings/Settings';
import EditWork from '../CreateWork/EditWork';

 function Display(props) {
   return (
     <Container className="display">
      <DisplayHeader />
      <Switch>
        <Route exact path='/' component={WorkCardsGrid}/>
        <Route path='/create-work' component={CreateWork}/>
        <Route path='/completed-works' component={WorkCardsGrid}/>
        <Route path='/edit-work/:id' component={EditWork}/>
        <Route path='/work/:id' component={FocusedWork}/>
        <Route path='/settings' component={Settings}/>
      </Switch>
      </Container>
   )
 }

 export default Display;
