import { Segment, Header as SemanticHeader, Icon, Popup } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../.././firebase/AuthContext';
import './Header.css'
import { useState, useEffect } from 'react';
import SignIn from '../AuthForm/SignIn';


function Header() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [userSignedIn, setUserSignedIn] = useState();

  const toHome = () => history.push('/');
  const toSettings = () => history.push('/settings')

  useEffect(() => {
      if (currentUser) {
        setUser(currentUser.displayName);
        setUserSignedIn(true);
      }
      else {
        setUser('Sign In')
        setUserSignedIn(false);
      }
  },[currentUser])

  return (
    <div className="app-header">
      <div>
      <SemanticHeader
        className='header-link'
        icon="settings"
        content="Settings"
        size='huge'
        style={{fontSize: '3em', color: 'white'}}
        onClick={toSettings}
      />
      </div>
      <div>
      <SemanticHeader
        className='header-link'
        icon="book"
        content="MinimalWork"
        size='huge'
        style={{fontSize: '3em', color: 'white'}}
        onClick={toHome}
      />
      </div>
      <div>
      <Popup
        content={
          <SignIn signIn={userSignedIn} />
        }
        on='click'
        trigger={
          <SemanticHeader
            className='header-link'
            icon="user"
            content={user}
            size='huge'
            style={{fontSize: '3em', color: 'white'}}
          />
        }
      />
      </div>
    </div>
  )
}



export default Header;
