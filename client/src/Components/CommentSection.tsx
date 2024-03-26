import { Form, Toast } from "react-bootstrap";
import { CommentsectionType } from "../types/commentTypes";
import { Comment } from "../types/dataTypes";

function CommentSection({ display, comments }: CommentsectionType) {
  return (
    <>
      <div className={display}>
        {comments.map((comment: Comment) => {
          console.log("comment :>> ", comment);
          return (
            <div>
              <div className="border-top m-2">
                <Toast className="w-100">
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Author</strong>
                    <small>{comment.createdAt}</small>
                  </Toast.Header>
                  <Toast.Body>{comment.comment}</Toast.Body>
                </Toast>
              </div>
            </div>
          );
        })}
        {/* write a comment */}
        <div className="border-top m-2">
          <Toast className="w-100">
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Write a comment</strong>
              <small>Date</small>
            </Toast.Header>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Toast>
        </div>
      </div>
    </>
  );
}

export default CommentSection;
