import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Instructor from "layouts/Instructor.js";

export default function Dashboard() {
  const router = useRouter();
  const [quizId, setQuizId] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {

    const requestUrl = `https://blockchange-29151.as.r.appspot.com/delete-quiz?quiz_id=${quizId}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        setErrorMessage("Failed to Remove Quiz");
      });
  };

  return (
    <>
      <br />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="relative w-full mb-3">
            <br />
            <label
              style={{ color: "darkslategray", fontSize: "20px" }}
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Quiz ID
            </label>

            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Quiz ID"
              value={quizId}
              onChange={(e) => {
                setQuizId(e.target.value);
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
              Remove Quiz
            </button>
          </div>

          <p>{errorMessage}</p>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
