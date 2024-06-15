import React from "react";

const TimerComponent = ({ endtime, getTimeRemaining }) => {
  const [time, setTime] = React.useState(getTimeRemaining(endtime));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(endtime));
    }, 1000);
    return () => clearInterval(interval);
  }, [endtime]);

  return (
    <h5>{`${time.days}:${time.hours}:${time.minutes}:${time.seconds}`}</h5>
  );
};

export default TimerComponent;
