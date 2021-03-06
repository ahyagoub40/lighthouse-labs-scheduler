import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem.js";
// let classnames = require('classnames');



export default function DayList(props) {
  const allDay =props.days.map(day => {
      return (
        <DayListItem 
          key={day.id}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      )
    });

  return (
    <ul>{allDay}</ul>
  );
}