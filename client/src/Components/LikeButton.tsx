import { SetStateAction, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import PostCardModal from "./PostCardModal";
import { FetchedData } from "../types/dataTypes";

declare type LikeButtonType = {
  liked: boolean;
  postId: string;
  numOfComments: number;
  usersWhoLiked: UsersWhoLikedType[];
  props: FetchedData;
};
declare type UsersWhoLikedType = {
  username: string;
  _id: string;
};

function LikeButton({
  postId,
  numOfComments,
  usersWhoLiked,
  props,
}: LikeButtonType) {
  const userId = localStorage.getItem("userId");
  const arrOfUsers: string[] = [];
  usersWhoLiked.map((user) => {
    arrOfUsers.push(user._id);
  });
  let prevLikes;
  if (userId) {
    prevLikes = arrOfUsers.includes(userId);
  }
  const [isLiked, setIsLiked] = useState<boolean>(
    prevLikes as unknown as boolean
  ); //returns true if liked,false if not
  const [results, setResults] = useState(usersWhoLiked);

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
          setResults(result.usersWhoLiked);
          setIsLiked(!isLiked);
          //setUsersWhoLiked(result.usersWhoLiked);
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
  let likeButton;
  let likeText;
  if (isLiked) {
    likeButton = <FaRegThumbsDown />;
    likeText = "Disike it";
  } else {
    likeButton = <FaRegThumbsUp />;
    likeText = "Like it";
  }
  return (
    <>
      <div className="d-flex justify-content-around border-bottom  ">
        <Card.Text style={{ fontSize: "2vh" }} className="mb-1">
          {results.length == 0
            ? "Be first to like this"
            : results.length == 1 && isLiked
            ? "You like this"
            : results.length == 1
            ? results.map((user) => {
                return user.username + " likes this";
              })
            : results.length >= 2
            ? results[0].username +
              " and " +
              (results.length - 1) +
              " other like this"
            : 0}
        </Card.Text>

        <Card.Text style={{ fontSize: "2vh" }}>
          Comments ({numOfComments})
        </Card.Text>
      </div>
      <div className="d-flex justify-content-around">
        <Button
          className="text-secondary text-decoration-none align-middle"
          variant="link"
          onClick={() => {
            isLiked ? setIsLiked(false) : setIsLiked(true), handleLike();
          }}
        >
          {likeButton}
          {likeText}
        </Button>
        <PostCardModal props={props} isLiked={isLiked} />
      </div>
    </>
  );
}
export default LikeButton;
