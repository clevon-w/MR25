import React from "react";

import Lottie from "react-lottie";
import * as runningmanicon from "../runningmanicon.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: runningmanicon.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Runningman = () => {
  return <Lottie options={defaultOptions} height={120} width={120} />;
};

export default Runningman;
