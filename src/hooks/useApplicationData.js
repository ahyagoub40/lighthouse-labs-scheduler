import  { useReducer, useEffect } from "react";
import axios from "axios";

const getDayIndex = function(appointmentID) {
  if (appointmentID / 5 <= 5 && appointmentID / 5 >= 4) {
    return  4;
  } 
  if (appointmentID / 5 <= 4 && appointmentID / 5 >= 3) {
    return  3;
  } 
  if (appointmentID / 5 <= 3 && appointmentID / 5 >= 2) {
    return 2;
  } 
  if (appointmentID / 5 <= 2 && appointmentID / 5 >= 1) {
    return 1;

  }
  if (appointmentID / 5 <= 1) {
    return 0;
  } 
}
const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
}

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOT_INCREMENT = "SET_SPOT_INCREMENT";
const SET_SPOT_DECREMENT = "SET_SPOT_DECREMENT";
function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, ...action.value }
    case SET_APPLICATION_DATA:
      return { ...state, ...action.value }
    case SET_INTERVIEW:
      return { ...state, ...action.value }
    case SET_SPOT_INCREMENT:
      return { ...state, ...action.value }
    case SET_SPOT_DECREMENT:
      return { ...state, ...action.value }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setDay = day => dispatch({type: SET_DAY, value: {day}})
  // function updateSpotsRemaining(daysArray, action) {
  //   return daysArray.map((item, index) => {
  //     if (index !== action.index) {
  //       return item
  //     }
  //     return {
  //       ...item,
  //       ...action.item
  //     }
  //   })
  // }
  
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
    console.log(state.days[dayIndex].spots)
    // updateSpotsRemaining(state.days, appointments) 
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({type: SET_INTERVIEW, value: {appointments}})
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
    console.log(state.days[dayIndex].spots)
    // updateSpotsRemaining(state.days, appointments) 
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({type: SET_INTERVIEW, value: {appointments}})
    })
  }
  
  useEffect(() => {
    Promise.all([Promise.resolve(axios.get(`http://localhost:8001/api/days`)), 
                 Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
                 Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`))])
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