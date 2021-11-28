import React, {useState} from "react";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats  from "components/Cards/CardStats";
// layout for page

import Instructor from "layouts/Instructor.js";
import { backgroundColor } from "tailwindcss/defaulttheme";
import { white } from "tailwindcss/colors";

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
                <legend>Question 1 </legend>
                <input type="radio" value="option 1" name="q1" /> option 1
                <input type="radio" value="option 2" name="q1" /> option 2
                <input type="radio" value="option 3" name="q1" /> option 3
              </div>
              
              <div onChange={onChangeValue} style={{ backgroundColor: "white"}}>
                <legend>Question 2</legend>
                <input type="radio" value="option 1" name="q2" /> option 1
                <input type="radio" value="option 2" name="q2" /> option 2
                <input type="radio" value="option 3" name="q2" /> option 3
                
              </div>

              <div onChange={onChangeValue} style={{ backgroundColor: "white"}}>
                <legend>Question 3 </legend>
                <input type="radio" value="option 1" name="q3" /> option 1
                <input type="radio" value="option 2" name="q3" /> option 2
                <input type="radio" value="option 3" name="q3" /> option 3
               
              </div>
                          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const x = 5;

const func = (x,y,z) => {

  const [name, setName] = useState("Musa")

  useEffect(() => {
    if (name == "Musa") {

    }
  }, [name])

  const handleSubmit = (e) => {

  }

  return (
    <div>
      <h1 onClick={handleSubmit} >Hello world {name}</h1>
    </div>
  )
}

Dashboard.layout = Instructor;
