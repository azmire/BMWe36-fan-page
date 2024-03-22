import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaRegThumbsUp } from "react-icons/fa6";

declare type LikeButtonType = {
  likeButtonDisabled: boolean;
};

function LikeButton({ likeButtonDisabled }: LikeButtonType) {
  // console.log("likeButtonDisabled :>> ", likeButtonDisabled);
  const [likes, setLikes] = useState<number | null>(1); //add 1 to num of likes
  const [buttonDisabled, setButtonDisabled] = useState(false); //after the button is clicked, disable
  const [results, setResults] = useState({});
  // console.log("results :>> ", results);

  const handleLike = () => {
    setButtonDisabled(!buttonDisabled);
    setLikes(1);

    const urlencoded = new URLSearchParams();
    urlencoded.append("likes", likes);
    urlencoded.append("likeButtonDisabled", buttonDisabled);
    console.log("buttonDisabled :>> ", buttonDisabled);
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
      .then((result) => setResults(result))
      .catch((error) => console.error(error));
  };
  useEffect(() => {}, []);
  return (
    <div>
      <Button
        className="text-secondary text-decoration-none align-middle"
        variant="link"
        disabled={results.likeButtonDisabled}
        onClick={handleLike}
      >
        <FaRegThumbsUp />
        Like it!
      </Button>
    </div>
  );
}

export default LikeButton;
