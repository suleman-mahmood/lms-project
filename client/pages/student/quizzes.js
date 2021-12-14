import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  const [quizSolutions, setQuizSolutions] = useState({});
  const [score, setScore] = useState({});

  const onChangeValue = (event) => {
    const newObj = {
      ...radioValue,
      [event.target.name]: event.target.value,
    };
    setRadioValue(newObj);
    // console.log(newObj);
  };

  useEffect(() => {
    const requestUrl = `http://localhost:3010/get-quizzes?course_id=${router.query.course_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setData(data);

          // Get Quiz Answers
          const requestUrl = `http://localhost:3010/get-quiz-answers?email=${email}`;
          fetch(requestUrl)
            .then((response) => {
              response.json().then((data) => {
                console.log(data);

                data.forEach((dataItem) => {
                  const decodedJsonObject = JSON.parse(
                    Buffer.from(dataItem.answer, "base64").toString("ascii")
                  );

                  const temp = {
                    ...quizSolutions,
                    [dataItem.quiz_id]: decodedJsonObject,
                  };
                  setQuizSolutions(temp);
                });
              });
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleTakeQuiz = (quiz_data) => {

    if (quizSolutions[quiz_data.quiz_id]) {
      // Check if the solution exists then you have already submitted the quiz
      console.log("You already have taken the quiz");
      setErrorMessage("You already have taken the quiz");
      return;
    }

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

  const handleCheckMarks = (quiz_data) => {
    const requestUrl = `http://localhost:3010/get-questions?quiz_id=${quiz_data.quiz_id}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then((data) => {
          // Calculate marks
          // console.log(data);
          let total_marks = 0;
          let marks_gained = 0;

          data.forEach((item) => {
            total_marks += item.marks;
            // console.log(item, quizSolutions[quiz_data.quiz_id]);

            if (item.answer === quizSolutions[quiz_data.quiz_id][item.prompt]) {
              marks_gained += item.marks;
            }
          });

          const temp = {
            ...score,
            [quiz_data.quiz_id]: [marks_gained, total_marks],
          };
          setScore(temp);
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

    const requestUrl = `http://localhost:3010/submit-quiz?quiz_id=${
      currentQuizData[0].quiz_id
    }&email=${email}&time=${current_time}&answers=${JSON.stringify(
      radioValue
    )}`;
    fetch(requestUrl)
      .then((response) => {
        response.json().then(() => {
          setErrorMessage("Quiz Submitted");
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
        <button
          onClick={submitQuiz}
          className="github-star mt-2 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
        >
          Submit Quiz
        </button>
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
                      <button
                        onClick={() => handleCheckMarks(quiz_data)}
                        className="github-star mt-2 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                      >
                        Check Marks
                      </button>
                      {score[quiz_data.quiz_id] ? (
                        <p>
                          Marks Obtained {score[quiz_data.quiz_id][0]} out of{" "}
                          {score[quiz_data.quiz_id][1]}
                        </p>
                      ) : null}
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
