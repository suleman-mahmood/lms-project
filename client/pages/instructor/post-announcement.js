import React, {useState} from "react";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats  from "components/Cards/CardStats";
// layout for page

import Instructor from "layouts/Instructor.js";

export default function Dashboard() {

  const [announcement, setAnnouncement] = useState("")

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              
             
                {/* <label>
                  Announcement:
                  <input type="text" value={state.value} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" /> */}

              <br/>

              <label className="block text-left">
                <span className="text-gray-700">Post Announcement</span>
                <textarea
                  className="mt-1 block w-full"
                  rows="3"
                  placeholder="Enter some long form content."
                  onChange={(e) => {setAnnouncement(e.target.value)}}
                ></textarea>
              </label>
                          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
