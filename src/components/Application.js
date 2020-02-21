import React from "react";
import "components/Application.scss";
import useApplicationData from "../hooks/useApplicationData";
import DayList from "./DayList.js";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();
  
  console.log(state.day);
  const appointmentArray = getAppointmentsForDay(state, state.day);
  const allAppointment = appointmentArray.map(appointment => {
    const todayInterview = getInterview(state, appointment.interview);
    const todayInterviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={todayInterview}
        interviewers={todayInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
 
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {allAppointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
