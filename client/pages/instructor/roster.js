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
  const [data, setData] = useState();

  useEffect(() => {
    const requestUrl = `https://blockchange-29151.as.r.appspot.com/roster?course_id=${router.query.course_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setData(data);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <br />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="flex flex-wrap">
            { data ? data.map((item, i) => {
              return (
                <div key={i} className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-2">
                  <CardStats
                    statSubtitle={item.roll_number}
                    statTitle={item.s_name}
                  />
                </div>
              );
            }) : null }
          </div>

        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
