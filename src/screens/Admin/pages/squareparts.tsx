import axios from "axios";
import { useState } from "react";
import "./index.css";
import * as xlsx from "xlsx";
import Cookies from "js-cookie";

export default function SquareParts() {
  let submit = (file: any) => {
    const token = Cookies.get("Token");
    // console.log(token);
    axios
      .post("https://bacr-backend.vercel.app/api/spareparts", {
        Data: file,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // console.log(file);
      })
      .finally(function () {
        // always executed
      });
    // console.log(file)
  };
  const [File, setFile] = useState<any>();
  // console.log(File);
  const readUploadFile = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setFile(json);
        // console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  return (
    <>
      <div>
        <div>
          <h1>SquareParts</h1>
        </div>
        <div className="container d-flex justify-content-center align-item-center">
          <div className="row">
            <div className="col-12">
              <h3>Upload a Excel file here ... </h3>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center align-item-center">
          <div className="row ">
            <div
              className="col-12 col-md-12 d-flex flex-column gap-2"
              style={{ height: "30vh" }}
            >
              <label
                className="d-flex flex-column align-item-center"
                htmlFor="fdas"
                style={{
                  display: "none !important",
                  height: "100px",
                  width: "500px",
                  minWidth: "200px",
                  border: "1px solid grey",
                }}
              >
                <div className="d-flex justify-content-center align-item-center">
                  <h5 style={{ color: "#6d6d6d", margin: "10px 0px" }}>
                    Upload a excel file here ...
                  </h5>
                </div>
                <input
                  id="fdas"
                  className=" custom_file"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={readUploadFile}
                />
              </label>
              <button className="btn btn-primary" onClick={() => submit(File)}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {File && (
                <table className="table  table-striped table-hover">
                  <thead>
                    <tr>
                      <td>S.No</td>
                      <td>Descripton</td>
                      <td>Stock</td>
                    </tr>
                  </thead>
                  <tbody>
                    {File?.map((text: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{text.id}</td>
                          <td>{text.DESCRIPTION}</td>
                          <td>{text.STATUS}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
