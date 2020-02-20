import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confrim from "./Confirm";
import Status from "./Status";
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  console.log(props.interview);
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview, function(){
      transition(SHOW);
    })
  }

  function deleteAppointment() {
    transition(DELETE)
    
    props.cancelInterview(props.id, function(){
      transition(EMPTY);
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() =>transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() =>transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (<Confrim
        message="Delete the appointment?"
        onCancel={() =>transition(SHOW)}
        onConfirm={deleteAppointment}
       />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onSave={(name, interviewer) => { save(name, interviewer)}}
        onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={(name, interviewer) => { save(name, interviewer)}}
        onCancel={() => back()}
        />
      )}
    </article>
  );
  
};