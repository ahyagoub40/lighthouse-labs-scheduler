export function getAppointmentsForDay(state, givenDay) {
  const Appointments = state.days.filter(day => day.name === givenDay);
  const appointmentsDetails =[];
  if (state.length === 0 || Appointments.length === 0) {
    return appointmentsDetails;
  }
  const givenDayAppointments = Appointments[0].appointments
  givenDayAppointments.forEach(appointmentId => {
    appointmentsDetails.push(state.appointments[appointmentId])
  });
  return appointmentsDetails;
}

export function getInterview(state, interview1) {
  let currentInterview = {};
  if (interview1) {
    for (const key in state.interviewers) {
      const key1 = state.interviewers[key];
      if (key1.id === interview1.interviewer) {
        currentInterview.student = interview1.student;
        currentInterview.interviewer = {...key1}
        return currentInterview;
      }
    }
  } 
  return null;
}


export function getInterviewersForDay(state, givenDay) {
  const activeInterviewers = state.days.filter(day => day.name === givenDay);
  const interviewerDetails =[];
  if (state.length === 0 || activeInterviewers.length === 0) {
    return interviewerDetails;
  }
  const givenDayInterviewers = activeInterviewers[0].interviewers;
  givenDayInterviewers.forEach(interviewerId => {
    interviewerDetails.push(state.interviewers[interviewerId])
  });
  return interviewerDetails;
}