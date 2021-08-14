import CreateWork from './CreateWork';
import { useParams } from 'react-router-dom'

function EditWork() {

  const { id } = useParams();

  console.log(id, 'id in edit')

  return (<CreateWork edit={id}/>)
}

export default EditWork;
