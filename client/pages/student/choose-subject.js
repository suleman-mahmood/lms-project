import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats";
import { useAtom } from "jotai";

import Student from "layouts/Student.js";
import { courseIdAtom, userEmailAtom } from "components/state";

export default function Dashboard(params) {
  const router = useRouter();

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-600 md:pt-32 pb-32 pt-12">
        <div className="px-3 md:px-10 mx-auto w-full h-1/2">
          <div className="flex flex-wrap">
            <div
              onClick={() => {
                Router.push({
                  pathname:
                    window.location.origin + "/student/resources",
                    query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Resources" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname:
                    window.location.origin + "/student/roster",
                    query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Check Roster" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname:
                    window.location.origin + "/student/assignments",
                    query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Assignments" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname:
                    window.location.origin + "/student/quizzes",
                    query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Quizzes" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname:
                    window.location.origin + "/student/announcements",
                    query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Announcements" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Student;
