import { Form, Input, Segment, Container, Button } from 'semantic-ui-react';
import { useAuth } from '../.././firebase/AuthContext'
import { useHistory } from 'react-router-dom';
import './AuthForm.css';
import { useState, useEffect } from 'react';

function SignIn(props) {

  const {
    signIn,
    signUp,
    signOut,
    signUpAsGuest,
    currentUser
  } = useAuth();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const [showSignUp, setShowSignUp] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  const signInUser = () => signIn(email, password);
  const signUpUser = () => signUp(email, password, firstName, lastName);
  const signOutUser = () => {
    signOut();
    setSignedIn(false);
  }

  useEffect(() => {
    if (currentUser) {
      setSignedIn(true);
    }
  }, [currentUser])

  return (
    <div>
        {
          signedIn ?
            <Button
              fluid
              size='huge'
              content="Sign Out"
              onClick={signOutUser}
            />
            :
            <>
            <Form size='massive' onSubmit={showSignUp ? signInUser : signUpUser}>
              {
                !showSignUp &&
                <>
                  <Form.Field
                    control={Input}
                    label='First Name'
                    placeholder='First Name'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                  <Form.Field
                    control={Input}
                    label='Last Name'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </>
              }
              <Form.Field
                control={Input}
                label='Email'
                placeholder='Email'
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Field
                control={Input}
                label='Password'
                placeholder='Password'
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                fluid
                size='huge'
                type='submit'
                content={showSignUp ? "Sign In" : "Sign Up"}
              />
            </Form>
            {
              showSignUp ?
                <p
                  className='auth-option'
                  onClick={() => setShowSignUp(!showSignUp)}
                  >
                  Sign Up Instead ?
                </p>
                :
                <p
                  className='auth-option'
                  onClick={() => setShowSignUp(!showSignUp)}
                  >
                  Sign In Instead ?
                </p>
            }
            </>
        }
    </div>
  )
}

export default SignIn;
