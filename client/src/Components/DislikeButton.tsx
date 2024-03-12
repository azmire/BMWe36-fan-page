import { FaRegThumbsDown } from "react-icons/fa";
import { Button } from "react-bootstrap";

function DislikeButton() {
  return (
    <div>
      <Button
        className="text-secondary text-decoration-none align-middle"
        variant="link"
      >
        <FaRegThumbsDown />
        Dislike it!
      </Button>
    </div>
  );
}

export default DislikeButton;
