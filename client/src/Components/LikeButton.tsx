import { Button } from "react-bootstrap";
import { FaRegThumbsUp } from "react-icons/fa6";

function LikeButton() {
  //   const increaseLikeNumber = async;
  return (
    <div>
      <Button
        className="text-secondary text-decoration-none align-middle"
        variant="link"
        //onClick={() => increaseLikeNumber()}
      >
        <FaRegThumbsUp />
        Like it!
      </Button>
    </div>
  );
}

export default LikeButton;
