import React from "react";
import Dotloader from "react-spinners/DotLoader";
export default function Loader({ size }) {
  return (
    <Dotloader color="#f0f0f0" loading size={size} speedMultiplier={1.3} />
  );
}
