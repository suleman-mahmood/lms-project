import React from "react";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats";
// layout for page

import Instructor from "layouts/Instructor.js";

export default function Dashboard() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats statSubtitle="" statTitle="Assignment 1" />
              </div>
              <p>Click on the "Choose File" button to upload a file:</p>
              <form action="/action_page.php">
                <input type="file" id="myFile" name="filename" />
                <input type="submit" />
              </form>
              <br />

              <div>
                <br/>
              <label for="start_time">start_time (date and time):</label>
              <input type="datetime-local" id="start_time" name="start_time"/>
              <br/>
              <br/>
              <label for="end_time">end_time (date and time):</label>
              <input type="datetime-local" id="end_time" name="end_time"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
