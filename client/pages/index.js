/* eslint-disable react/jsx-no-target-blank */
import React, {useEffect} from "react";

export default function Index() {

  useEffect(() => {
    window.location.href = window.location.origin + "/auth/login";
  }, [])

  return (<></>)
}
