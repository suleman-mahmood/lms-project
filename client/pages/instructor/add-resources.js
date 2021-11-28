import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Instructor from "layouts/Instructor.js";

export default function Dashboard() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [fileData, setFileData] = useState();
  const [course_id, setCourse_id] = useState("");

  useEffect(() => {
    setCourse_id(router.query.course_id);
  }, []);

  const handleSubmit = () => {
    const a_id = Math.floor(Math.random() * 1000000);
    const requestUrl = `http://localhost:3010/create-assignment?a_id=${a_id}&open_date=${openDate}&close_date=${closeDate}&course_id=${course_id}`;
    fetch(requestUrl, {method:"POST", body: fileData})
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Failed to add Student");
      });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="relative w-full mb-3">
            <br/>
            <label style={{color: 'darkslategray', fontSize:"20px"}}
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Open Date
            </label>
            
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="MM/DD/YYYY"
              value={openDate}
              onChange={(e) => {
                setOpenDate(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
          <br/>
            <label style={{color: 'darkslategray', fontSize:"20px"}}
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Close Date
            </label>
            
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="MM/DD/YYYY"
              value={closeDate}
              onChange={(e) => {
                setCloseDate(e.target.value);
              }}
            />
          </div>

          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
            <i className="fas fa-cloud-upload-alt fa-3x"></i>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                setFileData(e.target.files[0]);
              }}
            />
          </label>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              Add File
            </button>
          </div>

          {errorMessage}
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
