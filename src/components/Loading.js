import Spinner from 'react-bootstrap/Spinner';

function Loading(props) {
  return (
    <div className='text-center my-5' >
        <Spinner animation="grow" variant="primary" />
        <h5 className='mt-3'>{props.msg}</h5>
    </div>
  )

}

export default Loading;