import { FaRegThumbsDown } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

declare type DislikeButtonType = {
  dislikeButtonDisabled: boolean;
};

function DislikeButton({ dislikeButtonDisabled }: DislikeButtonType) {
  console.log("dislikeButtonDisabled :>> ", dislikeButtonDisabled);
  const [dislikes, setDislikes] = useState<number | null>(1); //add 1 to num of dislikes
  const [click, setClick] = useState(false); //is the button clicked or not
  const [buttonDisabled, setButtonDisabled] = useState(false); //after the button is clicked, disable

  const handleDisike = () => {
    setClick(!click);
    setButtonDisabled(!buttonDisabled);
    setDislikes(1);

    const urlencoded = new URLSearchParams();
    urlencoded.append("dislike", dislikes);
    urlencoded.append("dislikeButtonDisabled", buttonDisabled);

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

  useEffect(() => {
    console.log("changed :>> ");
  }, [buttonDisabled]);

  return (
    <div>
      <Button
        className="text-secondary text-decoration-none align-middle"
        variant="link"
        disabled={dislikeButtonDisabled}
        onClick={handleDisike}
      >
        <FaRegThumbsDown />
        Dislike it!
      </Button>
    </div>
  );
}

export default DislikeButton;
