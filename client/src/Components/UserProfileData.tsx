import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import ModalComponent from "./CreateCardModal";
import useFetch from "../hooks/useFetch";
import { UserData } from "../types/dataTypes";
import { MdAddAPhoto } from "react-icons/md";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";

function UserProfileData() {
  const params = useParams();
  const { id } = params;
  const token = localStorage.getItem("token");
  const [profileImage, setProfileImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<ArrayBuffer | string | null>(null);
  console.log("preview", preview);

  //FETCH LOGGED IN USER DATA
  const url = `http://localhost:9876/api/users/${id}`;
  let { data } = useFetch(url) as unknown as UserData;

  //USER PROFILE IMAGE PREVIEW

  const imagePreview = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };
    setProfileImage(target.files[0]);

    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
  };
  //USER PROFILE IMAGE UPLOAD
  const handleImageUpload = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer${token}`);
    try {
      if (!profileImage) {
        console.log("no profile image selected");
        return;
      }
      const formdata = new FormData();
      formdata.append("avatar", profileImage);

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: formdata,
        redirect: "follow" as RequestRedirect,
      };

      const response = await fetch(
        `http://localhost:9876/api/users/update/${id}`,
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        console.log("result :>> ", result);
      }
    } catch (err) {
      const error = err as Error;

      console.log(error.message);
    }
  };
  //UPLOAD BUTTON
  let uploadButton;

  if (!preview) {
    console.log("no preview");

    uploadButton = (
      <label
        style={{ height: "8vh", width: "8vh" }}
        className=" add-image-button  badge rounded-circle"
      >
        <MdAddAPhoto size={40} />
        <input
          style={{ display: "none" }}
          type="file"
          name="image"
          onChange={imagePreview}
        ></input>
      </label>
    );
  }
  if (preview) {
    uploadButton = (
      <Button
        id="profile-image"
        className="confirm-image-button badge rounded-circle"
        variant="secondary"
        onClick={handleImageUpload}
      >
        <GiConfirmed size={40} color="green" />
      </Button>
    );
  }
  return (
    <div>
      {/* user profile header image container */}
      <div>
        <div className="d-grid align-items-top justify-content-center">
          <Row>
            <Col sm={12}>
              <Image
                style={{ width: "80vw", height: "50vh" }}
                src={data.imagePlaceholder}
                fluid
              />
            </Col>
          </Row>
        </div>

        {/* user profile body container */}
        <Container className="d-grid justify-content-center justify-content-md-start px-5">
          <Row>
            <Col>
              <Image
                className="profile-image " //user image rounded
                style={{ height: "35vh", width: "35vh" }}
                src={(preview as string) ? (preview as string) : data.avatar}
                roundedCircle
              />
              <form className="form-position">
                <div>{uploadButton}</div>
              </form>

              <div className="d-flex justify-content-center mt-4">
                <h2>{data.username}</h2>
              </div>
            </Col>
          </Row>

          {/* edit profile navbar */}
          <Row>
            <Navbar bg="light" data-bs-theme="light">
              <Container>
                <Nav className="me-auto fw-bold">
                  <Nav.Link>My posts</Nav.Link>
                  <Nav.Link>Features</Nav.Link>
                  <Nav.Link>Edit</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          </Row>
        </Container>
      </div>

      <div className="background pt-3">
        <Container>
          <Row>
            <Col xs lg="4">
              <Card className="h-100">
                <Card.Header>
                  <b>User info</b>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>From: Berlin, Germany</ListGroup.Item>
                  <ListGroup.Item>Member since {data.createdAt}</ListGroup.Item>
                  <ListGroup.Item>
                    Member of BMW oldtimer club DE
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col lg="8">
              <Card>
                <Card.Header as="h5">
                  <b>Add a new card</b>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Click the button below to add a new card with your car info
                  </Card.Title>
                  <Card.Text>
                    You have just finished Your new prject? Share it with us!
                    Upload some photos and give us short description about Your
                    car.
                  </Card.Text>
                  <ModalComponent placeholder={data.imagePlaceholder} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UserProfileData;
