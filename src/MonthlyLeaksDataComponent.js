import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import * as d3 from 'd3';

const MonthlyLeaks = () => {
  const [hasError, setErrors] = useState(false);
  const [monthlyLeaks, setMonthlyLeaks] = useState({});
  const [monthlyTemps, setMonthlyTemps] = useState({});

  async function fetchData() {
    const resLeaks = await fetch("http://127.0.0.1:5000/api/monthly-leaks");
    const resTemps = await fetch("http://127.0.0.1:5000/api/monthly-temps");

    resLeaks
      .json()
      .then(resLeaks => setMonthlyLeaks(resLeaks))
      .catch(err => setErrors(err));
      
    resTemps
    .json()
    .then(resTemps => setMonthlyTemps(resTemps))
    .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });


  return (
    <div>
      <span>{JSON.stringify(monthlyLeaks)}</span>
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
      <hr />

      <span>{JSON.stringify(monthlyTemps)}</span>
      <hr />    
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
  );
};
export default MonthlyLeaks;
