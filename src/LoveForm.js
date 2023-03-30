import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const LoveForm = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [percentage, setPercentage] = useState(0);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { firstName, lastName } = userData;
    const fruits = Math.floor(Math.random() * 101);
    setPercentage(fruits);
    fetch(
      "https://lovecal-d2f1d-default-rtdb.firebaseio.com/userDataRecords.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
        }),
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name1, name2, percentage);
    const uri = "http://localhost:5000";
    axios
      .post(`${uri}/api/love`, { name1, name2 })
      .then((res) => {
        // console.log(res.data);
        setPercentage(res.data.percentage);
      })
      .catch((err) => {
        // const fruits = Math.floor(Math.random() * 101);
        // setPercentage(fruits);
        console.error(err);
      });
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="name1">Name 1:</label>
    //     <input
    //       type="text"
    //       id="name1"
    //       value={name1}
    //       onChange={(e) => setName1(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="name2">Name 2:</label>
    //     <input
    //       type="text"
    //       id="name2"
    //       value={name2}
    //       onChange={(e) => setName2(e.target.value)}
    //     />
    //   </div>
    //   <button type="submit">Calculate Love Percentage</button>
    //   {percentage > 0 && (
    //     <div>
    //       <p>Love Percentage: {percentage}%</p>
    //     </div>
    //   )}
    // </form>

    <form onSubmit={handleSubmit}>
      <div className="topFile">
        <div className="wrapper">
          <div className="heading">
            <h1>Love ♥ Calculator</h1>
            <h4>Get Your Own Love Result Instantly*</h4>
          </div>
          <div className="maincontent">
            <div>
              <label htmlFor="name1">*Your Name</label>
              <input
                type="text"
                id="name1"
                name="firstName"
                value={userData.firstName}
                // onChange={(e) => setName1(e.target.value)}
                onChange={postUserData}
              />
            </div>
            <div>
              <label htmlFor="name2">*Her/His Name</label>
              <input
                type="text"
                id="name2"
                name="lastName"
                value={userData.lastName}
                // onChange={(e) => setName2(e.target.value)}
                onChange={postUserData}
              />
            </div>
          </div>
          <button type="submit" onClick={submitData}>
            ❤ Calculate ❤
          </button>
          {percentage > 0 && (
            <div>
              <p style={{ fontSize: "25px", marginTop: "5px" }}>
                Love Percentage: <br></br>
                {percentage}%
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        <h1 className="first" style={{ paddingBottom: "10px" }}>
          Created For Fun
        </h1>

        <h1 className="first" style={{ paddingBottom: "10px" }}>
          Don't Take it to Heart
        </h1>
        <h1 className="first" style={{ paddingBottom: "120px" }}>
          Enjoy It
        </h1>
      </div>
    </form>
  );
};

export default LoveForm;
