import { Form, Container, Button, Grid, Input } from 'semantic-ui-react';
import { useAuth } from '../.././firebase/AuthContext';
import { useState, useEffect } from 'react';
import WorkCard from '../WorkCard/WorkCard';
import './CreateWork.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { database } from '../.././firebase/firebase';
import { guid } from '../.././utils/helpers';
import { useHistory } from 'react-router-dom';

function CreateWork(props) {

  const { currentUser } = useAuth();
  const history = useHistory();

  const [workCardId, setWorkCardId] = useState(guid());
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDueDatetime] = useState(new Date());
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (props.edit && currentUser) {
      database.ref(`users/${currentUser.uid}/works/${props.edit}`)
        .on('value', snapshot => {
          const data = snapshot.val();
          setWorkCardId(props.edit);
          setTitle(data.title);
          setSubtitle(data.subtitle);
          setDescription(data.description);
          setDueDatetime(new Date(data.datetime));
          setCompleted(data.completed);
        })
    }
  }, [])


  let workCard = {
    workCardId,
    title,
    subtitle,
    description,
    dueDate: datetime.toDateString(),
    dueTime: datetime.toTimeString(),
    datetime: datetime.toString(),
    completed
  }

  const handleSubmit = () => {
    database
      .ref(`users/${currentUser.uid}/works/${workCardId}`)
      .set(workCard);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setDueDatetime(new Date());
    setCompleted(false);
  }

  const handleUpdate = () => {
    database
      .ref(`users/${currentUser.uid}/works/${workCardId}`)
      .update(workCard);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setDueDatetime(new Date());
    setCompleted(false);
    history.push('/');
  }

  return (
    <Container>
    <Grid doubling columns={2} className="middle aligned mt-5">
      <Grid.Column>

          <Form size="large" onSubmit={props.edit ? handleUpdate : handleSubmit}>
        <Form.Field>
          <label className="fs-2 mb-3">Title:</label>
          <input
            value={title}
            placeholder='English Presentation'
            onChange={e => setTitle(e.target.value)}
            maxLength="20"
            required
          />
        </Form.Field>
        <Form.Field>
          <label className="fs-2 mb-3">Subtitle:</label>
          <input
            value={subtitle}
            placeholder='ENG-105'
            onChange={e => setSubtitle(e.target.value)}
            maxLength="24"
            required
          />
        </Form.Field>
        <Form.Field>
          <label className="fs-2 mb-3">Description:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </Form.Field>

        <Form.Field>
          <label className="fs-2 mb-3">Deadline:</label>
          <DatePicker
            selected={datetime}
            onChange={datetime => setDueDatetime(datetime)}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<Input />}
            withPortal

          />
        </Form.Field>
        <Button
          type='submit'
          primary
          fluid
          >
            {props.edit ? "Update" : "Submit"}
          </Button>
        </Form>

      </Grid.Column>
      <Grid.Column>
        <Container>
          <WorkCard work={workCard} creating/>
        </Container>
      </Grid.Column>
    </Grid>
    </Container>
  )
}

export default CreateWork;
