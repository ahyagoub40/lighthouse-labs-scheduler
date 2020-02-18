import React from "react";
import "components/DayListItem.scss";
let classnames = require('classnames');



export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots =function(props) {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    else {
      return `${props.spots} spots remaining`;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2> 
      <h3 className={dayClass}>{formatSpots(props)}</h3>
    </li>
  );
}