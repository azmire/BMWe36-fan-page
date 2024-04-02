import { SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";

declare type LikeButtonType = {
  liked: boolean;
  postId: string;
  setUsersWhoLiked: React.Dispatch<React.SetStateAction<null>>;
};

function LikeButton({ liked, postId, setUsersWhoLiked }: LikeButtonType) {
  const [isLiked, setIsLiked] = useState(liked); //returns true if liked,false if not
  const [results, setResults] = useState({});
  const userId = localStorage.getItem("userId");

  const handleLike = async () => {
    const urlencoded = new URLSearchParams();
    if (userId) {
      urlencoded.append("liked", !isLiked as unknown as string);
      urlencoded.append("author", userId);

      const requestOptions = {
        method: "PATCH",
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
      };
      try {
        const response = await fetch(
          `http://localhost:9876/api/posts/${postId}`,
          requestOptions
        );
        console.log("response :>> ", response);
        if (response.ok) {
          const result = await response.json();
          console.log("result after like :>> ", result);
          setResults(result);
          setIsLiked(!isLiked);
          setUsersWhoLiked(result.usersWhoLiked.length);
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

  if (isLiked == false) {
    return (
      <Button
        className="text-secondary text-decoration-none align-middle"
        variant="link"
        onClick={() => {
          setIsLiked(true), handleLike();
        }}
      >
        <FaRegThumbsUp />
        Like it!
      </Button>
    );
  } else if (isLiked == true) {
    return (
      <Button
        className="text-secondary text-decoration-none align-middle"
        variant="link"
        onClick={() => {
          setIsLiked(false), handleLike();
        }}
      >
        <FaRegThumbsDown />
        Disike it!
      </Button>
    );
  }
}
export default LikeButton;
