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
  // const [radioValue, setRadioValue] = useState({});
  const router = useRouter();
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [questionData, setQuestionData] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [course_id, setCourse_id] = useState("");

  // USE THIS WHEN TAKING QUIZES
  // const onChangeValue = (event) => {
  //   const newObj = {
  //     ...radioValue,
  //     [event.target.name]: event.target.value,
  //   };
  //   setRadioValue(newObj);
  //   console.log(newObj);
  // };

  const handleSubmit = () => {
    const start = startTime.split("T")[0] + " " + startTime.split("T")[1];
    const close = endTime.split("T")[0] + " " + endTime.split("T")[1];
    const quiz_id = Math.floor(Math.random() * 1000000);

    // Create quiz first
    const requestUrl = `http://localhost:3010/create-quiz?quiz_id=${quiz_id}&no_of_ques=${numberOfQuestions}&start_time=${start}&end_time=${close}&course_id=${course_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setErrorMessage("Added Quiz");

          // Add questions now
          let promises = []

          for (let index = 0; index < numberOfQuestions; index++) {
            const ques_id = Math.floor(Math.random() * 1000000);
            const marks = questionData[index].marks
            const prompt = questionData[index].prompt
            const opt1 = questionData[index].opt1
            const opt2 = questionData[index].opt2
            const opt3 = questionData[index].opt3
            const opt4 = questionData[index].opt4
            const answer = questionData[index].answer
            
            const requestUrl = `http://localhost:3010/create-question?ques_id=${ques_id}&marks=${marks}&prompt=${prompt}&opt_1=${opt1}&opt_2=${opt2}&opt_3=${opt3}&opt_4=${opt4}&answer=${answer}&quiz_id=${quiz_id}`;
            promises.push(fetch(requestUrl))
          }

          Promise.all(promises).then(values => {
            console.log(values);
          })
          .catch(err => {
            console.log(err.message);
            setErrorMessage("Failed to Add Questions");
          })

        });
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Failed to Add Quiz");
      });
  };

  useEffect(() => {
    setCourse_id(router.query.course_id);
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="relative w-full mb-3 mt-12">
            <label
              style={{ color: "darkslategray", fontSize: "20px" }}
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            >
              Number of Questions
            </label>

            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Number of Questions"
              value={numberOfQuestions}
              onChange={(e) => {
                setNumberOfQuestions(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="MM/DD/YYYY"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="MM/DD/YYYY"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
            />
          </div>

          {Array.from({ length: numberOfQuestions }).map((value, i) => {
            return (
              <div key={i}>
                <h4>Question Number {i + 1}</h4>

                <div className="relative w-full mb-3">
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Marks"
                    name="marks"
                    value={
                      questionData
                        ? questionData[i]
                          ? questionData[i].marks
                          : ""
                        : ""
                    }
                    onChange={(e) => {
                      const newData = {
                        ...questionData,
                        [i]: {
                          ...questionData[i],
                          [e.target.name]: e.target.value,
                        },
                      };
                      setQuestionData(newData);
                      console.log(newData);
                    }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Prompt"
                    name="prompt"
                    value={
                      questionData
                        ? questionData[i]
                          ? questionData[i].prompt
                          : ""
                        : ""
                    }
                    onChange={(e) => {
                      const newData = {
                        ...questionData,
                        [i]: {
                          ...questionData[i],
                          [e.target.name]: e.target.value,
                        },
                      };
                      setQuestionData(newData);
                      console.log(newData);
                    }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Option 1"
                    name="opt1"
                    value={
                      questionData
                        ? questionData[i]
                          ? questionData[i].opt1
                          : ""
                        : ""
                    }
                    onChange={(e) => {
                      const newData = {
                        ...questionData,
                        [i]: {
                          ...questionData[i],
                          [e.target.name]: e.target.value,
                        },
                      };
                      setQuestionData(newData);
                      console.log(newData);
                    }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Option 2"
                    name="opt2"
                    value={
                      questionData
                        ? questionData[i]
                          ? questionData[i].opt2
                          : ""
                        : ""
                    }
                    onChange={(e) => {
                      const newData = {
                        ...questionData,
                        [i]: {
                          ...questionData[i],
                          [e.target.name]: e.target.value,
                        },
                      };
                      setQuestionData(newData);
                      console.log(newData);
                    }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Option 3"
                    name="opt3"
                    value={
                      questionData
                        ? questionData[i]
                          ? questionData[i].opt3
                          : ""
                        : ""
                    }
                    onChange={(e) => {
                      const newData = {
                        ...questionData,
                        [i]: {
                          ...questionData[i],
                          [e.target.name]: e.target.value,
                        },
                      };
                      setQuestionData(newData);
                      console.log(newData);
                    }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Option 4"
                    name="opt4"
                    value={
                      questionData
                        ? questionData[i]
                          ? questionData[i].opt4
                          : ""
                        : ""
                    }
                    onChange={(e) => {
                      const newData = {
                        ...questionData,
                        [i]: {
                          ...questionData[i],
                          [e.target.name]: e.target.value,
                        },
                      };
                      setQuestionData(newData);
                      console.log(newData);
                    }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Answer"
                    name="answer"
                    type="number"
                    value={
                      questionData
                        ? questionData[i]
                          ? questionData[i].answer
                          : ""
                        : ""
                    }
                    onChange={(e) => {
                      const newData = {
                        ...questionData,
                        [i]: {
                          ...questionData[i],
                          [e.target.name]: e.target.value,
                        },
                      };
                      setQuestionData(newData);
                      console.log(newData);
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              Create Quiz
            </button>
          </div>

          <p className="" >{errorMessage}</p>

          {/* USE THIS WHEN TAKING QUIZES */}
          {/* <div onChange={onChangeValue} className="block">
            <span className="text-gray-700">Radio Buttons</span>
            <div className="mt-2">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="opt1"
                    value="1"
                  />
                  <span className="ml-2">Option 1</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="opt1"
                    value="2"
                  />
                  <span className="ml-2">Option 2</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="opt1"
                    value="3"
                  />
                  <span className="ml-2">Option 3</span>
                </label>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
