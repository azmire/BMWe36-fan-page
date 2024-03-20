import { Dispatch, useState } from "react";
import { Button } from "react-bootstrap";
import { BiComment } from "react-icons/bi";

declare type CommentButtonType = {
  setValue: Dispatch<string>;
};

function CommentButton({ setValue }: CommentButtonType) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleDiv = () => {
    if (isVisible) {
      setIsVisible(false);
      setValue("d-block ");
    } else {
      setIsVisible(true);
      setValue("d-none");
    }
  };

  return (
    <div>
      <div>
        <Button
          className="text-secondary text-decoration-none align-middle"
          variant="link"
          // value={value}
          onClick={toggleDiv}
        >
          <BiComment />
          Comments
        </Button>
      </div>
    </div>
  );
}

export default CommentButton;
