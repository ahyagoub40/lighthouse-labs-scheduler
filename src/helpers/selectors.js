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
  let currentInterviewer = {};
  for (const key in state.appointments) {
    const key1 = state.appointments[key];
    if (interview1 && key1.interview) {
      if (key1.interview.interviewer === interview1.interviewer) {
        currentInterviewer.student = key1.interview.student;
        const desiredInterviewer = state.interviewers[interview1.interviewer];
        currentInterviewer.interviewer = {...desiredInterviewer};
        return currentInterviewer;
  
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
  console.log(state);
  givenDayInterviewers.forEach(interviewerId => {
    interviewerDetails.push(state.interviewers[interviewerId])
  });
  return interviewerDetails;
}