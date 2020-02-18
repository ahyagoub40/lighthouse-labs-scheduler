import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";
// let classnames = require('classnames');



export default function InterviewerList(props) {

  const allInterviewers =props.interviewers.map(interviewer => {
      return (
        <InterviewerListItem 
          name={interviewer.name}
          avatar={interviewer.avatar} 
          selected={interviewer.id === props.interviewer}
          setInterviewer={() => props.setInterviewer(interviewer.id)}
        />
      )
    });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {allInterviewers}
      </ul>
    </section>
  );
}
