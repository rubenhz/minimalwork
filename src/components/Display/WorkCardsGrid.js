import { Grid } from 'semantic-ui-react';
import WorkCard from '../WorkCard/WorkCard';
import { database, firebase } from '../.././firebase/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '../.././firebase/AuthContext';
import { Header as SemanticHeader } from 'semantic-ui-react';

function WorkCardsGrid(props) {

  const { currentUser } = useAuth();
  const [works, updateWorks] = useState([]);

  const active = work => !work.completed;
  const completed = work => work.completed;
  const all = work => work;
  const late = work => work.late;

  useEffect(() => {
    if (currentUser) {
      database.ref(`users/${currentUser.uid}/works`).on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          updateWorks(Object.values(data));
        }
      });
    } else {
      updateWorks([]);
    }
  }, [currentUser])

  works.sort((x, y) => new Date(x.datetime) - new Date(y.datetime));

  return(
    <div className="workCardsGrid" >
    {
      currentUser ?
        <Grid doubling stretched columns={3} >
           {
             works.filter(all).map((work, index) => (
               <Grid.Column>
                 <WorkCard short key={index} work={work}/>
               </Grid.Column>
             ))
           }
         </Grid>
         :
         <SemanticHeader
          content='Sign In or Create an Account to Use MinimalWork'
          textAlign='center'
          style={{marginTop: 350, fontSize: '4em', color: 'grey'}}
         />
    }
    </div>
  )
}

export default WorkCardsGrid
