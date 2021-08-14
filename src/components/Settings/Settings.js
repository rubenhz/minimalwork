import './Settings.css';
import { useAuth } from '../.././firebase/AuthContext';
import { Form, Container, Button, Header as SemanticHeader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';

function Settings() {

  const { currentUser } = useAuth();

  const [userName, setUserName] = useState('Undefined')
  const [userEmail, setUserEmail] = useState('Undefined')

  const [update, setUpdate] = useState(false);

  const updateUserInfo = () => {
    currentUser.updateProfile({
      displayName: userName,
      email: userEmail
    })
    setUpdate(!update)
  }


  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.displayName)
      setUserEmail(currentUser.email)
    }
  }, [currentUser])

  return (
    <div className='settings-container'>
      <SemanticHeader content="Settings" style={{fontSize: '3.5em', textAlign: 'center'}}/>
      <Form size='huge'>
        <Form.Input
          label='Name'
          placeholder='Name'
          readOnly={!update}
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          readOnly={!update}
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        {
          update ?
            <Button.Group widths={2} style={{marginBottom: 20}}>
              <Button
                content='Save'
                onClick={updateUserInfo}
              />
              <Button
                content='Cancel'
                onClick={() => setUpdate(false)}
              />
            </Button.Group>
            :
            <Button
              content='Update'
              color='green'
              fluid
              style={{marginBottom: 20}}
              onClick={() => setUpdate(true)}
            />
        }
        <Button
          content='Reset Password'
          color='yellow'
          fluid
          style={{marginBottom: 20}}
        />
        <Button
          content='Delete Account'
          color='red'
          fluid
          size='small'
        />
      </Form>
    </div>
  )
}

export default Settings;
