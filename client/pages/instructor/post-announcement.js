import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats";
// layout for page

import Instructor from "layouts/Instructor.js";

export default function Dashboard() {
  const router = useRouter();
  const [announcement, setAnnouncement] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [course_id, setCourse_id] = useState("");

  const handleSubmit = () => {
    const ann_id = Math.floor(Math.random() * 1000000);
    const dateNow = new Date();
    const current_time =
      dateNow.toISOString().split("T")[0] +
      " " +
      dateNow.toTimeString().split(" ")[0];
    
    const requestUrl = `http://localhost:3010/post-announcement?ann_id=${ann_id}&description=${announcement}&time=${current_time}&course_id=${course_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        setErrorMessage("Failed to add Announcement");
      });
  };

  useEffect(() => {
    setCourse_id(router.query.course_id);
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Announcement Text
            </label>
            <textarea
              value={announcement}
              onChange={(e) => {
                setAnnouncement(e.target.value);
              }}
              className="form-textarea mt-1 block w-full"
              rows="3"
              placeholder="Enter your announcement"
            ></textarea>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              Add Announcement
            </button>
          </div>

          <p>{errorMessage}</p>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
