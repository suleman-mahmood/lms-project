import React, { useState } from "react";

// layout for page

import Ro from "layouts/Ro.js";

export default function Dashboard() {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [courseid, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [credithours, setCreditHours] = useState("");
  const [coursecode, setCourseCode] = useState("");
  const [instructoremail, setCourseInstructor] = useState("");
  const [coursecreatoremail, setCourseCreaotor] = useState("");
  const [semester, setSemester] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    const requestUrl = `http://localhost:3010/create-course?course_id=${courseid}&name=${name}&course_code=${coursecode}&department=${department}&credit_hours=${credithours}&semester=${semester}&year=${year}&r_email=${coursecreatoremail}&i_email=${instructoremail}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setErrorMessage(data.message);
        });
      })
      .catch((err) => {
        setErrorMessage("Failed to create Course");
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
              Department
            </label>
            <input
              // type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
          </div>

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
              Name
            </label>
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Credit Hours
            </label>
            <input
              type="number"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Credit Hours"
              value={credithours}
              onChange={(e) => {
                setCreditHours(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Instructor Email
            </label>
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Instructor Email"
              value={instructoremail}
              onChange={(e) => {
                setCourseInstructor(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Course Creator Email
            </label>
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Course Creator Email"
              value={coursecreatoremail}
              onChange={(e) => {
                setCourseCreaotor(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Course Code
            </label>
            <input
              // type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Course Code"
              value={coursecode}
              onChange={(e) => {
                setCourseCode(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Year
            </label>
            <input
              // type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </div>

          <div>
            Semester
            <select value={semester} onChange={(e) => {setSemester(e.target.value)}}  name="semester" id="semester">
              <option value="">--SELECT A Semester--</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="spring">Spring</option>
            </select>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              Create Course
            </button>
          </div>

          {errorMessage}
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Ro;
