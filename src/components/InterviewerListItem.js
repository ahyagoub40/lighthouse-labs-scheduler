import React from "react";
import "components/InterviewerListItem.scss";
let classnames = require('classnames');



export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": true
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={interviewerClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : null}
    </li>
  );
}
