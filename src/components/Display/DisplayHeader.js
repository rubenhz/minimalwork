import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';


function DisplayHeader() {

  const history = useHistory();

  const sendToCreateWork = () => {
    history.push('/create-work');
  }
  const sendToActiveWorks = () => history.push('/');
  const sendToCompletedWorks = () => history.push('/completed-works');

  return (
    <Button.Group widths={3} style={{height: 80}}>
      <Button
        color="green"
        size="massive"
        circular
        icon="plus"
        style={{width: 0}}
        onClick={sendToCreateWork}
      />

      <Button
        icon="grid layout"
        content=" Active Works"
        size="massive"
        onClick={sendToActiveWorks}
      />
      <Button
        icon="check"
        content=" Completed Works"
        size="massive"
        onClick={sendToCompletedWorks}
      />
    </Button.Group>
  )
}

export default DisplayHeader;
