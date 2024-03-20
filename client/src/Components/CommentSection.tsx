import { Toast } from "react-bootstrap";

declare type CommentsectionType = {
  toggleShow: string;
  comments: CommentType[];
};
declare type CommentType = {
  createdAt: string;
  comment: string;
};

function CommentSection({ toggleShow, comments }: CommentsectionType) {
  return (
    <div className={toggleShow}>
      {comments.map((comment: CommentType) => {
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
          <Toast.Body>Write sth...</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default CommentSection;
