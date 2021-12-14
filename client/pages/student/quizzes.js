import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats";
// layout for page

import Student from "layouts/Student.js";
import { useAtom } from "jotai";
import { userEmailAtom } from "components/state";

export default function Dashboard() {
  const [radioValue, setRadioValue] = useState({});
  const router = useRouter();
  const [email] = useAtom(userEmailAtom);

  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [takeQuiz, setTakeQuiz] = useState(false);
  const [currentQuizData, setCurrentQuizData] = useState();

  const onChangeValue = (event) => {
    const newObj = {
      ...radioValue,
      [event.target.name]: event.target.value,
    };
    setRadioValue(newObj);
    console.log(newObj);
  };

  useEffect(() => {
    const requestUrl = `http://localhost:3010/get-quizzes?course_id=${router.query.course_id}`;
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

  const handleTakeQuiz = (quiz_data) => {
    // Fetch quiz data
    const requestUrl = `http://localhost:3010/get-questions?quiz_id=${quiz_data.quiz_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          setTakeQuiz(true);
          setCurrentQuizData(data);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const submitQuiz = () => {
    const dateNow = new Date();
    const current_time =
      dateNow.toISOString().split("T")[0] +
      " " +
      dateNow.toTimeString().split(" ")[0];
    const requestUrl = `http://localhost:3010/submit-quiz?quiz_id=${currentQuizData[0].quiz_id}&email=${email}&time=${current_time}&answers=${radioValue}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log("Quiz Submitted");
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (takeQuiz) {
    return (
      <>
        {currentQuizData
          ? currentQuizData.map((question_data) => {
              return (
                <>
                  <div className="flex flex-wrap">
                    <div onChange={onChangeValue} className="block">
                      <span className="text-gray-700">
                        {question_data.prompt}
                      </span>
                      <p>Marks: {question_data.marks}</p>
                      <div className="mt-2">
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name={question_data.prompt}
                              value="1"
                            />
                            <span className="ml-2">{question_data.opt_1}</span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name={question_data.prompt}
                              value="2"
                            />
                            <span className="ml-2">{question_data.opt_2}</span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name={question_data.prompt}
                              value="3"
                            />
                            <span className="ml-2">{question_data.opt_3}</span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name={question_data.prompt}
                              value="4"
                            />
                            <span className="ml-2">{question_data.opt_4}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          : null}
        <button onClick={submitQuiz}>Submit Quiz</button>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            {data
              ? data.map((quiz_data) => {
                  return (
                    <div>
                      <p>Quiz ID: {quiz_data.quiz_id}</p>
                      <p>Quiz Start Time: {quiz_data.start_time}</p>
                      <p>Quiz End Time: {quiz_data.end_time}</p>

                      <button
                        onClick={() => handleTakeQuiz(quiz_data)}
                        className="github-star mt-2 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                      >
                        Start Quiz
                      </button>
                    </div>
                  );
                })
              : null}

            <p className="">{errorMessage}</p>
          </div>
        </div>
      </>
    );
  }
}

Dashboard.layout = Student;
