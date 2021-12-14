import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";

import CardStats from "components/Cards/CardStats";
import Instructor from "layouts/Instructor.js";

export default function Dashboard(params) {
  const router = useRouter();

  return (
    <>
      <div className="relative bg-blueGray-600 md:pt-32 pb-32 pt-12">
        <div className="px-3 md:px-10 mx-auto">
          <div className="flex flex-wrap">
            <div
              onClick={() => {
                Router.push({
                  pathname:
                    window.location.origin + "/instructor/add-resources",
                  query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Add Resources" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname: window.location.origin + "/instructor/roster",
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
                    window.location.origin + "/instructor/make-assignment",
                  query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Make Assignment" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname: window.location.origin + "/instructor/make-quiz",
                  query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Make Quiz" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname: window.location.origin + "/instructor/delete-quiz",
                  query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Delete Quiz" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname:
                    window.location.origin + "/instructor/post-announcement",
                  query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Post Announcement" />
            </div>
            <div
              onClick={() => {
                Router.push({
                  pathname:
                    window.location.origin + "/instructor/send-email",
                  query: router.query,
                });
              }}
              className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-2"
            >
              <CardStats statSubtitle="" statTitle="Send Email" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Instructor;
