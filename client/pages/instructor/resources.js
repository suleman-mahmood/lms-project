import React from "react";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats  from "components/Cards/CardStats";
// layout for page

import Instructor from "layouts/Instructor.js";

export default function Dashboard() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            
              <p>Click on the "Choose File" to upload resource:</p>
              <form action="/action_page.php"> 
                <input type="file" id="myFile" name="filename"/>
                <input type="submit"/>
              </form>
              <br/>
              <br/>
              <table class="table-auto">
            <thead>
            <tr>
                <th>File Name</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-emerald-200">
                <td>Intro-to-CSS.ppt</td>
              </tr>
              <tr class="bg-emerald-200">
                <td>class-1.pdf</td>
              </tr>
              
                <tr class="bg-emerald-200">
                <td>Intro-to-JavaScript.mp4</td>
              </tr>
            </tbody>
          </table>

          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
