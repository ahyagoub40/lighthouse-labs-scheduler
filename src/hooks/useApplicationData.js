import  { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_SPOT} from "../reducers/application";
const getDayIndex = function(appointmentID) {
  const result = appointmentID / 5;
  if (result <= 5 && result >= 4) {
    return  4;
  } 
  if (result <= 4 && result >= 3) {
    return  3;
  } 
  if (result <= 3 && result >= 2) {
    return 2;
  } 
  if (result <= 2 && result >= 1) {
    return 1;

  }
  if (result <= 1) {
    return 0;
  } 
}

const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
}

const spotsRemaining = function(state, index) {
  const appointmentsForDay = state.days[index].appointments;
  let counter = appointmentsForDay.length;
  appointmentsForDay.forEach(id => {
    if (state.appointments[id].interview) {
      counter-- ;
    }
  });
  return counter;
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setDay = day => dispatch({type: SET_DAY, value: {day}})
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayIndex = getDayIndex(id);
    
    const spots = spotsRemaining({...state, appointments}, dayIndex)
    const day = {
      ...state.days[dayIndex],
      spots
    };
    const days = [...state.days];
    days[dayIndex] = day;
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({type: SET_INTERVIEW, value: {appointments}})
      dispatch({type: SET_SPOT, value: {days}})
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
    const dayIndex = getDayIndex(id);
    const spots = spotsRemaining({...state, appointments}, dayIndex)
    const day = {
      ...state.days[dayIndex],
      spots
    };
    const days = [...state.days];
    days[dayIndex] = day;
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({type: SET_INTERVIEW, value: {appointments}})
      dispatch({type: SET_SPOT, value: {days}})
    })
  }
  
  useEffect(() => {
    Promise.all([Promise.resolve(axios.get(`/api/days`)), 
                 Promise.resolve(axios.get(`/api/appointments`)),
                 Promise.resolve(axios.get(`/api/interviewers`))])
      .then(all => {
        dispatch({type: SET_APPLICATION_DATA, 
        value: {days: all[0].data, appointments: all[1].data, interviewers: all[2].data}})
      })
      .catch(error => {
        Error(error);
      });
  }, []);
  return {state, setDay, bookInterview, cancelInterview}
}