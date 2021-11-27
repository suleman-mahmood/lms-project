import React, {useState} from "react";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = () => {
    const requestUrl = `http://localhost:3010/add-instructor?name=${name}&email=${email}&password=${password}&department=${department}`; 
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
              Email
            </label>
            <input
              type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              type="password"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Name
            </label>
            <input
              // type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Name"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Department
            </label>
            <input
              // type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Department"
              value={department}
              onChange={(e) => {setDepartment(e.target.value)}}
            />
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => {handleSubmit()}}
            >
              Add Instructor
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
