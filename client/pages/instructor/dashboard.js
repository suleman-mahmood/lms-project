import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats";
import { useAtom } from "jotai";

import Instructor from "layouts/Instructor.js";
import { courseIdAtom, userEmailAtom } from "pages/state";

export default function Dashboard(params) {
  const [email] = useAtom(userEmailAtom);
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const requestUrl = `http://localhost:3010/courses-taught?email=${email}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setData(data);
        });
      })
      .catch((err) => {
        console.log("Failed to fetch courses from given email:", err.message);
      });
  }, []);

  return (
    <>
     
      <h1 style={{ color: 'DarkSlateGray' , fontSize:"40px" ,fontStyle: "italic" }}>Welcome to Instructor's Dashboard</h1>
    </>
  );
}

Dashboard.layout = Instructor;
