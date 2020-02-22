import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confrim from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  function save(name, interviewer) {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
    }
  }

  function deleteAppointment() {
    transition(DELETE, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE))
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
      {mode === ERROR_SAVE && (<Error
        message="there is an error saving"
        onClose={() => back()}
       />
      )}
      {mode === ERROR_DELETE && (<Error
      message="there is an error delete"
      onClose={() => back()}
      />
      )}
    </article>
  );
  
};