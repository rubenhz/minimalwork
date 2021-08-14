import WorkCard from '../WorkCard/WorkCard';
import { useEffect, useState } from 'react';
import { database } from '../.././firebase/firebase';
import { useAuth } from '../.././firebase/AuthContext';
import { useParams, useHistory } from 'react-router-dom';
import { Loader, Button, Icon } from 'semantic-ui-react';
import Card from 'react-bootstrap/Card';
import './FocusedWork.css';

function FocusedWork() {

  const [work, setWork] = useState();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
      const path = `users/${currentUser.uid}/works/${id}`;
      database.ref(path).on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          setWork(data);
        }
      })
    }
  }, [currentUser, id])

  const deleteWork = () => {
    if (currentUser){
      database.ref(`users/${currentUser.uid}/works/${work.workCardId}`)
        .remove();
    }
    history.push('/');
  }

  const editWork = () => {
    history.push(`/edit-work/${work.workCardId}`)
  }

  return (
    <div className="mt-5">
    {
      work ?
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div>
        <div className='options-header'>
        <div className='options-group'>
        <Icon
          link
          name="edit"
          size='large'
          color='blue'
          onClick={editWork}
        />
        <Icon
          link
          name='x'
          size='large'
          color='red'
          onClick={deleteWork}
        />
        </div>
        </div>
        <WorkCard
          work={work}
          creating
          style={{width: 340, borderRadius: '0px 0px 25px 25px'}}
        />
        </div>
        </div>
        :
        <Loader active size="massive"/>
    }
    </div>
  )
}

export default FocusedWork;
