import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Instructor from "layouts/Instructor.js";

export default function Dashboard() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [recipent, setRecipent] = useState("");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const handleSubmit = () => {
    const requestUrl = `https://blockchange-29151.as.r.appspot.com/send-email?to=${recipent}&subject=${subject}&text=${messageBody}`;
    fetch(requestUrl)
      .then((response) => {
        setErrorMessage("Email Sent Successfully");
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Unable to send Email");
      });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="relative w-full mb-3">
            <br />
            <label
              style={{ color: "darkslategray", fontSize: "20px" }}
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Recipient Email
            </label>

            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Recipient Email"
              value={recipent}
              onChange={(e) => {
                setRecipent(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <br />
            <label
              style={{ color: "darkslategray", fontSize: "20px" }}
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Subject
            </label>

            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xl font-bold mb-2"
              htmlFor="grid-password"
            >
              Email Body
            </label>
            <textarea
              value={messageBody}
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              className="form-textarea mt-1 block w-full"
              rows="3"
              placeholder="Enter your Email body"
            ></textarea>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              Send Email
            </button>
          </div>

          <p className="">{errorMessage}</p>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
