import { useEffect, useState } from "react";

type User = {
  _id: string;
  email: string;
  username: string;
  password: string;
};

function Login() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:9876/api/users/allusers", requestOptions)
        .then((response) => response.json())
        .then((result) => setUsers(result))
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);
  console.log("users :>> ", users);
  return <div>Login</div>;
}

export default Login;
