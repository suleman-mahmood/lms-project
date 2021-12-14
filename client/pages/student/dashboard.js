import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page

import Student from "layouts/Student.js";

export default function Dashboard() {
  return (
    <>
      <h1
        style={{
          color: "DarkSlateGray",
          fontSize: "40px",
          fontStyle: "italic",
        }}
      >
        Welcome to Student's Dashboard
      </h1>
    </>
  );
}

Dashboard.layout = Student;
