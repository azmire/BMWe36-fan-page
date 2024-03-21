import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaRegThumbsUp } from "react-icons/fa6";

declare type LikeButtonType = {
  likeButtonDisabled: boolean;
};

function LikeButton({ likeButtonDisabled }: LikeButtonType) {
  const [likes, setLikes] = useState<number | null>(1); //add 1 to num of likes
  const [click, setClick] = useState(false); //is the button clicked or not
  const [buttonDisabled, setButtonDisabled] = useState(false); //after the button is clicked, disable

  const handleLike = () => {
    setClick(!click);
    setButtonDisabled(!likeButtonDisabled);
    setLikes(1);

    const urlencoded = new URLSearchParams();
    urlencoded.append("likes", likes);
    urlencoded.append("likeButtonDisabled", buttonDisabled);

    const requestOptions = {
      method: "PATCH",
      body: urlencoded,
      redirect: "follow" as RequestRedirect,
    };

    fetch(
      "http://localhost:9876/api/posts/65fc1bc897de914317c7a73b",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Button
        className="text-secondary text-decoration-none align-middle"
        variant="link"
        disabled={likeButtonDisabled}
        onClick={handleLike}
      >
        <FaRegThumbsUp />
        Like it!
      </Button>
    </div>
  );
}

export default LikeButton;
