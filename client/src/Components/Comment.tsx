import { Toast } from "react-bootstrap";

function Comment() {
  return (
    <div>
      <Toast className="d-inline-block m-1 bg-light">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body className="bg-dark text-light">
          Hello, world! This is a toast message.
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default Comment;
