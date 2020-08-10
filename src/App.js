import React from "react";
import Dropzone from "react-dropzone";
import swal from "sweetalert";
import csv from "csv";
import "./App.css";

function App() {
  const onDrop = (files) => {
    let file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        if (err) {
          swal({
            title: "Sorry",
            text: "We only Receive .CSV file",
            icon: "error",
            button: "Try Again",
          });
          return;
        }
        let userList = [];
        for (let i = 1; i < data.length; i++) {
          const Designer_name = data[i][0];
          const Outfit_name = data[i][1];
          const Description = data[i][2];
          const Retail_price = data[i][3];
          const newUser = {
            Designer_name: Designer_name,
            Outfit_name: Outfit_name,
            Description: Description,
            Retail_price: Retail_price,
          };
          userList.push(newUser);
          fetch(process.env.REACT_APP_DATABASEURL, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }).then((response) => {
            response.status == "200"
              ? swal({
                  title: "Hurray!!",
                  text: "Data uploaded",
                  icon: "success",
                  button: "Done",
                })
              : swal({
                  title: "Opps",
                  text: "Something Went Wrong",
                  icon: "error",
                  button: "Try Again",
                });
          });
        }
      });
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div align="center" oncontextmenu="return false">
      <br />
      <br />
      <br />
      <div className="dropzone">
        <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dropzone-text">
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </div>
          )}
        </Dropzone>
        <br />
        <br />
        <br />
      </div>
      <h2>
        Upload or drop your <font color="#00A4FF">CSV</font>
        <br /> file here.
      </h2>
    </div>
  );
}

export default App;
