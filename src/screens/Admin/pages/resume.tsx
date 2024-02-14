import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Resume() {
  useEffect(() => {
    const token = Cookies.get("Token");
    // console.log(token);
    axios
      .get("https://bacr-backend.vercel.app/api/cv", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        // handle success
        setdata(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  let dlt = (id: any) => {
    const token = Cookies.get("Token");
    // console.log(token);
    axios
      .delete(`https://bacr-backend.vercel.app/api/cv/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(`${response}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(id);
  };
  const [data, setdata] = useState<any>();
  // console.log(data?.length);
  return (
    <>
      <h1>Resume</h1>
      <div className="container">
        <div className="col-12">
          <div className="d-flex gap-2 justify-content-center">
            {data?.length > 0
              ? data.map((text: any, index: number) => {
                  return (
                    <div
                      className="card"
                      key={index}
                      style={{ width: "18rem" }}
                    >
                      <button
                        onClick={() => dlt(text._id)}
                        className="btn btn-danger position-absolute"
                        style={{ right: "25px", top: "-10px" }}
                      >
                        <DeleteForeverIcon />
                      </button>
                      <iframe src={text.CV_Url} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">Name : {text.FullName}</h5>
                        <p className="card-text">
                          Apply For : {text.ApplyingFor}
                        </p>
                        <p className="card-text">Team : {text.Team}</p>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
