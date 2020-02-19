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
