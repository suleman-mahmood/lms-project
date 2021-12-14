import React, { useState } from "react";

import Ro from "layouts/Ro.js";
export default function EnrollStudent() {
  const [courseid, setCourseId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    const requestUrl = `http://localhost:3010/enroll-student?course_id=${courseid}&roll_number=${rollNumber}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          setErrorMessage(data.message);
        });
      })
      .catch((err) => {
        setErrorMessage("Failed to enroll Student");
      });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Course ID
            </label>
            <input
              // type="password"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Course ID"
              value={courseid}
              onChange={(e) => {
                setCourseId(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Roll Number
            </label>
            <input
              type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={(e) => {
                setRollNumber(e.target.value);
              }}
            />
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              Enroll Student
            </button>
          </div>
          {errorMessage}
        </div>
      </div>
    </>
  );
}

EnrollStudent.layout = Ro;
