// import { Textfit } from "react-textfit";
import "./Screen.scss";
import React from "react";
// import App from "./app";

interface Props {
  value: string;
  role: string;
  onClick: () => void;
  // className: string;
}

const Screen = ({ value, onClick }: Props) => {
  return (
    <div className="screen" onClick={onClick}>
      {value}
    </div>
  );
};

export default Screen;