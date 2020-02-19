export function getAppointmentsForDay(state, givenDay) {
  const Appointments = state.days.filter(day => day.name === givenDay);
  const appointmentsDetails =[];
  if (state.length === 0 || Appointments.length === 0) {
    return appointmentsDetails;
  }
  const givenDayAppointments = Appointments[0].appointments
  givenDayAppointments.forEach(appointmentId => {
    appointmentsDetails.push(state.appointments[appointmentId])
  })
  return appointmentsDetails;
}

export function getInterview(state, interview1) {
  let currentInterviewer = {};
  for (const key in state.appointments) {
    const key1 = state.appointments[key];
    if (key1.interview) {
      if (key1.interview.interviewer === interview1.id) {
        currentInterviewer.student = key1.interview.student;
        currentInterviewer.interviewer = {...interview1}
        return currentInterviewer;
  
      }
    }
  } 
  return null;
}

