import { useState } from "react";
import CountUp from "react-countup";
import "./counter.css";
import { IoIosArrowForward } from "react-icons/io";

export default function Counter(props) {
  const {
    endNumber,
    startNumber = 0,
    duration = 3,
    suffix = "",
    Icon,
    onClick = () => {},
  } = props;

  return (
    <div className="counter_container" onClick={onClick}>
      <div className="counter_number">
        <CountUp
          start={startNumber}
          end={endNumber}
          duration={duration}
          delay={0.5}
        />
      </div>
      {Icon ? (
        <div className="counter_icon">
          <Icon size={24} />
        </div>
      ) : (
        <></>
      )}
      <div className="counter_label">
        {suffix} <IoIosArrowForward />
      </div>
    </div>
  );
}
