import { Button, Form, Image, Toast } from "react-bootstrap";
import { CommentsectionType } from "../types/commentTypes";
import { useState } from "react";

function CommentSection({ display, comments, postId }: CommentsectionType) {
  const [existingComments, setExistingComments] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  //ADD A COMMENT
  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newComment || !userId) {
      console.log("no comment");
      return;
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer${token}`);

      const urlencoded = new URLSearchParams();
      urlencoded.append("comment", newComment);
      urlencoded.append("author", userId);
      urlencoded.append("post", postId);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
      };
      try {
        const response = await fetch(
          "http://localhost:9876/api/comments/addcomment",
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          console.log("result :>> ", result);
          setExistingComments(result.postItem.comments);
          setNewComment("");
        }
        if (!response.ok) {
          const result = await response.json();
          console.log("result :>> ", result);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };

  //DELETE COMMENT
  const deleteComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const commentId = e.currentTarget.id;
    console.log("commentId :>> ", commentId);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("commentId", commentId);
    urlencoded.append("postId", postId);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(
        "http://localhost:9876/api/comments/deletecomment",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log("result after deleting comment :>> ", result);
        setExistingComments(result.existingComments.comments);
      }
      if (!response.ok) {
        const result = await response.json();
        console.log("result :>> ", result);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      {/* *************** DIDSPLAY COMMENTS *************** */}
      <div className={display}>
        {existingComments &&
          existingComments.length &&
          existingComments.map((comment: any, i: number) => {
            return (
              <div key={i}>
                <div className="border-top m-2">
                  <Toast className="w-100">
                    <Toast.Header closeButton={false}>
                      <Image
                        //user image rounded
                        style={{ height: "3vh", width: "3vh", border: "5px" }}
                        src={comment.author.avatar}
                        roundedCircle
                      />
                      <strong className="me-auto">
                        {comment.author.username}
                      </strong>
                      <small>{comment.createdAt}</small>
                      <Button
                        id={comment._id}
                        onClick={(e) => {
                          deleteComment(e);
                        }}
                        title="delete"
                        className="ms-2 btn-link p-0 ps-2 bg-transparent text-secondary text-decoration-none"
                        style={{
                          display:
                            comment.author._id == userId ? "block" : "none",
                        }}
                      >
                        X
                      </Button>
                    </Toast.Header>
                    <Toast.Body>{comment.comment}</Toast.Body>
                  </Toast>
                </div>
              </div>
            );
          })}
        {/* *************** WRITE A COMMENT*************** */}
        <div className="border-top m-2">
          <Form
            onSubmit={(e) => {
              addComment(e);
            }}
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control
                placeholder="Write a comment..."
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CommentSection;
