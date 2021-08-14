import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Icon, Statistic, Button } from 'semantic-ui-react';
import './WorkCard.css';
import { to12HourFormat, shortenText } from '../.././utils/helpers';
import { useHistory } from 'react-router-dom';
import { database } from '../.././firebase/firebase';
import { useAuth } from '../.././firebase/AuthContext';


function FullWorkCard(props) {

  const history = useHistory();
  const { currentUser } = useAuth();

  const styleClass = props.creating ? "creatingWorkCard" : "workCard";

  const deadline = new Date(props.work.datetime);
  const [expired, setExpired] = useState(false);
  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [second, setSecond] = useState('00');

  function count () {
    const now = new Date().getTime();
    const t = deadline.getTime() - now;
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((t % (1000 * 60)) / 1000);
    if (t > 0) {
      setDay(days);
      setHour(hours);
      setMinute(minutes);
      setSecond(seconds);
      setExpired(false);
    } else {
      setExpired(true)
    }
  }

  const handleClick = () => history.push(`/work/${props.work.workCardId}`);

  useEffect(() => {
    const timer = setInterval(count, 1000);
    return () => clearInterval(timer);
  }, [deadline])

  return (
    <Card className={styleClass} onClick={handleClick}>
      {
        props.creating &&
        <Card.Header>
          <div style={{float: 'right'}}>
            <Icon
              link
              name="edit"
              size='large'
              color='blue'
              onClick={() => props.history.push(`/edit-work/${props.work.workCardId}`)}
            />
            <Icon
              link
              name='x'
              size='large'
              color='red'
              onClick={props.deleteWork}
            />
          </div>
        </Card.Header>
      }
      <Card.Body>
        <Card.Title as="h2" style={{fontSize: '2.3em'}}>
          {props.work.title}
        </Card.Title>
        <Card.Subtitle as="h3" className='text-muted' style={{fontSize: '1.9em'}}>
          {props.work.subtitle}
        </Card.Subtitle>
        <Card.Text className="mt-2 fs-5">
          {
            props.short ? shortenText(props.work.description, 75) :
              props.work.description
          }
        </Card.Text>
        <Card.Text className="mt-3 mb-1" as="h6" style={{fontSize: '1.5em'}}>
          Due: {props.work.dueDate.slice(3)} at {to12HourFormat(deadline)}
        </Card.Text>
        </Card.Body>
        <Card.Footer className="cardFooter">
        {
          expired ?
          <Card.Text className="expired mb-3">
            LATE<Icon name="exclamation"/>
          </Card.Text>
          :
          <Statistic.Group size="small" style={{margin: 0}}>

            <Statistic>
              <Statistic.Value>{day}</Statistic.Value>
              <Statistic.Label>Days</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{hour}</Statistic.Value>
              <Statistic.Label>Hours</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{minute}</Statistic.Value>
              <Statistic.Label>Minutes</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{second}</Statistic.Value>
              <Statistic.Label>Seconds</Statistic.Label>
          </Statistic></Statistic.Group>
        }
        </Card.Footer>
    </Card>
  )
}

export default FullWorkCard;
