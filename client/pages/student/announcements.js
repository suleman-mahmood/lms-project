import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats";
// layout for page

import Student from "layouts/Student";

export default function Dashboard() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const requestUrl = `http://localhost:3010/get-announcements?course_id=${router.query.course_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setAnnouncements(data);
        });
      })
      .catch((err) => {
        setErrorMessage("Failed to fetch Announcement");
      });
  }, []);

  return (
    <>
      <br />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {announcements
            ? announcements.map((ann) => {
                return (
                  <div className="mb-8" key={ann.id}>
                    <p>Posted on: {ann.a_time}</p>
                    <p>{ann.decription}</p>
                  </div>
                );
              })
            : null}

          <p>{errorMessage}</p>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Student;
