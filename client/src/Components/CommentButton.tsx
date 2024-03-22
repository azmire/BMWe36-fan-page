import { Dispatch } from "react";
import { Button } from "react-bootstrap";
import { BiComment } from "react-icons/bi";

declare type CommentButtonType = {
  setDisplay: Dispatch<string>;
  setClickedPostId: Dispatch<string>;
  id: string;
  display: string;
};

function CommentButton({
  display,
  setDisplay,
  setClickedPostId,
  id,
}: CommentButtonType) {
  console.log("commentButtonId :>> ", id);
  console.log("isVisible :>> ", display);

  const toggleDivVisible = () => {
    if (display == "d-none") {
      setDisplay("d-block");
    } else {
      setDisplay("d-none");
    }
  };
  const getClickedPostId = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("e.target.id :>> ", e.target.id);
    setClickedPostId(e.target.id); //telling us which post comment btn is being clicked
  };

  return (
    <div>
      <div>
        <Button
          id={id}
          className="text-secondary text-decoration-none align-middle"
          variant="link"
          // value={value}
          onClick={(e) => {
            toggleDivVisible(), getClickedPostId(e);
          }}
        >
          <BiComment />
          Comments
        </Button>
      </div>
    </div>
  );
}

export default CommentButton;
