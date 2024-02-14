import { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  useEffect(() => {
    const token = Cookies.get("Token");
    if (token) {
      Navigate("/dashboard");
    }
    token;
  }, []);
  const [Login, setLogin] = useState<any>();
  console.log(Login);
  const [data, setData] = useState<any>();
  console.log(data);
  let Navigate = useNavigate();
  let submit = () => {
    axios
      .post("https://bacr-backend.vercel.app/api/auth/login", { ...Login })
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data.data);
        Cookies.set("Token", response.data.data.Token, {
          expires: 7,
        });

        Navigate("/dashboard");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    // console.log(file)
    console.log(Login);
  };
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className="card" style={{ width: "28rem", padding: "20px" }}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Astrol"
                onChange={(e) => {
                  let UserName = e.target.value;
                  setLogin({ ...Login, UserName });
                }}
              />
            </div>

            <label htmlFor={"inputPassword5"} className="form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword5"
              className="form-control"
              placeholder="********"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => {
                let Password = e.target.value;
                setLogin({ ...Login, Password });
              }}
            />
            <div id="passwordHelpBlock" className="form-text">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </div>
            <div className="mt-2">
              <button onClick={submit} className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
