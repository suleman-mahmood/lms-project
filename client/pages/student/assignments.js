import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Student from "layouts/Student.js";
import { useAtom } from "jotai";
import { userEmailAtom } from "components/state";

export default function Dashboard() {
  const router = useRouter();

  const [email, ] = useAtom(userEmailAtom);
  const [errorMessage, setErrorMessage] = useState("");
  const [assignments, setAssignments] = useState();
  const [fileData, setFileData] = useState();

  useEffect(() => {
    const requestUrl = `http://localhost:3010/get-assignments?course_id=${router.query.course_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          setAssignments(data);
        });
      })
      .catch((err) => {
        setErrorMessage("Failed to fetch Assignments");
      });
  }, []);

  const handleSubmit = (a_id) => {
    const dateNow = new Date();
    const current_time =
      dateNow.toISOString().split("T")[0] +
      " " +
      dateNow.toTimeString().split(" ")[0];

    const requestUrl = `http://localhost:3010/submit-assignment?a_id=${a_id}&email=${email}&time=${current_time}`;
    fetch(requestUrl, { method: "POST", body: fileData })
      .then((response) => {
        response.json().then(() => {
          console.log("Submitted Assignment");
          setErrorMessage("Submitted Assignment");
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {assignments
            ? assignments.map((ass) => {
                return (
                  <div className="mb-8">
                    <p>Assignment ID: {ass.a_id}</p>
                    <p>Assignment Start Time: {ass.open_date}</p>
                    <p>Assignment End Time: {ass.close_date}</p>
                    <a
                      href={window.URL.createObjectURL(new Blob([ass.a_blob]))}
                      download={`${ass.a_id}.jpg`}
                    >
                      {ass.a_id}.jpg
                    </a>
                    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                      <i className="fas fa-cloud-upload-alt fa-3x"></i>
                      <span className="mt-2 text-base leading-normal">
                        Upload Assignment File
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          setFileData(e.target.files[0]);
                        }}
                      />
                    </label>
                    <button
                      onClick={() => {
                        handleSubmit(ass.a_id);
                      }}
                    >
                      Submit Assignment
                    </button>
                  </div>
                );
              })
            : null}

          {errorMessage}
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Student;
