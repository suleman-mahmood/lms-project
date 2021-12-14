import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Student from "layouts/Student.js";

export default function Dashboard() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    const requestUrl = `https://blockchange-29151.as.r.appspot.com/get-resources?course_id=${router.query.course_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          setData(data);
        });
      })
      .catch((err) => {
        setErrorMessage(err.message);
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">

          {data ? data.map(item => {
            return (
              <div className="mb-8" >
                <p>ID: {item.r_id}</p>
                <p>Type: {item.r_type}</p>
                <p>Upload Date: {item.upload_date}</p>
                <a href={window.URL.createObjectURL(new Blob([item.r_blob]))} download={`${item.r_id}.jpg`}>
                  {item.r_id}.jpg
                </a>
              </div>
            );
          }): null}

          

          <p className="">{errorMessage}</p>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Student;
