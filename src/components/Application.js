import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList.js";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
}
export default function Application(props) {
  const [state, setState] = useState(initialState);

  const setDay = day => setState({ ...state, day });
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
      />
    );
  });
  useEffect(() => {
    Promise.all([Promise.resolve(axios.get(`http://localhost:8001/api/days`)), 
                Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
                Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`))])
      .then(all => {

        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch(error => {
        Error(error);
      });
  }, []);
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
