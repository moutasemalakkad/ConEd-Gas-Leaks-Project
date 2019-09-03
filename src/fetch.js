  // const monthlyLeaksTemps = () => {
  //   const [hasError, setErrors] = useState(false);
  //   const [monthlyLeaks, setMonthlyLeaks] = useState({});
  //   const [monthlyTemps, setMonthlyTemps] = useState({});
  
  //   async function fetchData() {
  //     const resLeaks = await fetch("http://127.0.0.1:5000/api/monthly-leaks");
  //     const resTemps = await fetch("http://127.0.0.1:5000/api/monthly-temps");
  
  //     resLeaks
  //       .json()
  //       .then(resLeaks => setMonthlyLeaks(resLeaks))
  //       .catch(err => setErrors(err));
        
  //     resTemps
  //     .json()
  //     .then(resTemps => setMonthlyTemps(resTemps))
  //     .catch(err => setErrors(err));
  //   }
  
  //   useEffect(() => {
  //     fetchData();
  //   })

  //     UNSAFE_componentWillMount(){
//       d3.queue()
//         .defer(d3.json,"http://127.0.0.1:5000/api/monthly-leaks")
//         .defer(d3.json,"http://127.0.0.1:5000/api/monthly-temps")
//         .await((error, leaks, temps ) => {
//             this.setState({
//                 leaks,
//                 temps
//             });
//         })
//     }