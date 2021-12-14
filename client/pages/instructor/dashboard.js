import React, { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { userEmailAtom } from "components/state";
import Instructor from "layouts/Instructor.js";
export default function Dashboard(params) {
  const [email] = useAtom(userEmailAtom);
  const [, setData] = useState([]);

  useEffect(() => {
    const requestUrl = `http://localhost:3010/courses-taught?email=${email}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setData(data);
        });
      })
      .catch((err) => {
        console.log("Failed to fetch courses from given email:", err.message);
      });
  }, []);

  return <></>;
}

Dashboard.layout = Instructor;
