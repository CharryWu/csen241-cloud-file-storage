import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function UploadButton({ isLoading, onSubmit, disabled }) {
  console.log('isloading: ', isLoading)
  if (isLoading) {
    return (
      <>

        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </>
    );
  }
  return (
    <>
      <Button disabled={disabled} onClick={onSubmit} className="btn btn-primary" variant="primary">
        <span>UPLOAD</span>
      </Button>
    </>
  );
}

export default UploadButton;
