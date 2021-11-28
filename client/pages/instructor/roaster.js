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
      <div className="relative bg-blueGray-800 md:pt-32 pb-40 pt-12">
        <div className="px-10 md:px-5 mx-auto w-full h-full">
          
          <div>
            {/* Card stats */}
            <div className="flex-wrap:wrap-reverse">
              <div className="lg:w-2/5 xl:w-3/12 px-10">
                <CardStats
                  statSubtitle=""
                  statTitle="Roaster"
                />
              </div>
              <br/>
              <br/>
              <br/>
              <table class="table-auto">
            <thead>
            <tr>
                <th>Student Name</th>
                <th>Roll Number</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-emerald-200">
                <td>Talal</td>
                <td>23100174</td>
              </tr>
              <tr class="bg-emerald-200">
              <td>Ahmed</td>
                <td>23100176</td>
              </tr>
              
                <tr class="bg-emerald-200">
                <td>Musa</td>
                <td>23100157</td>
              </tr>
            </tbody>
          </table>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
