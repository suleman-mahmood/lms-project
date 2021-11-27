import React, {useState} from "react";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {

  
  const [rollNumber, setRollNumber] = useState("");

  const handleSubmit = () => {
    const requestUrl = `http://localhost:3010/remove-student?roll_number=${rollNumber}`; 
    fetch(requestUrl)
    .then(response => {
      response.json()
      .then(data => {
        // console.log("Fetching Data:", data);

        if(data.enrolled){
          console.log(data.message);
        }
        else{
          console.log("There was an error in request");
        }
      })
    })
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Roll Number
            </label>
            <input
              type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={(e) => {setRollNumber(e.target.value)}}
            />
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => {handleSubmit()}}
            >
              Remove Student
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
