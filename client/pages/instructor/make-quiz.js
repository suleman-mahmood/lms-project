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

  const [radioValue, setRadioValue] = useState({})

  const onChangeValue=(event)=> {
    const newObj = {
      ...radioValue,
      [event.target.name]: event.target.value,
    }
    setRadioValue(newObj)
    console.log(newObj);
  }
  return (
    <>
      {/* Header */}

      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle=""
                  statTitle="Quiz 1"
                />
              </div>


              <div onChange={onChangeValue} style={{ backgroundColor: "white"}}>
                <legend>Question 1 
                <input type="radio" value="Male" name="q1" /> Male
                <input type="radio" value="Female" name="q1" /> Female
                <input type="radio" value="Other" name="q1" /> Other
                </legend>
              </div>

              <div onChange={onChangeValue} style={{ backgroundColor: "white"}}>
                <legend>Question 2
                <input type="radio" value="Male" name="q2" /> Male
                <input type="radio" value="Female" name="q2" /> Female
                <input type="radio" value="Other" name="q2" /> Other
                </legend>
              </div>

              <div onChange={onChangeValue} style={{ backgroundColor: "white"}}>
                <legend>Question 2
                <input type="radio" value="Male" name="q3" /> Male
                <input type="radio" value="Female" name="q3" /> Female
                <input type="radio" value="Other" name="q3" /> Other
                </legend>
              </div>
                          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
