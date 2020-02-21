import  { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }
  const [state, setState] = useState(initialState);
  const setDay = day => setState({ ...state, day });
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
      return axios.put(`/api/appointments/${appointment.id}`, appointment)
      .then(() => {
        setState({ ...state, appointments })
      })
  
  }
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log('here');
      return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments })
      })
  
  }
  
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
  return {state, setDay, bookInterview, cancelInterview}
}