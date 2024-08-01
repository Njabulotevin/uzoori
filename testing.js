const generateTime = () =>{
    let times  = [{hours: 0, minutes: 0}]
    for(let t = 0; t<=47 ; t++){
      if(times[t].minutes + 30 == 60){
          times.push({hours: times[t].hours + 1, minutes: 0})
      }else{
        times.push({hours: times[t].hours, minutes: times[t].minutes + 30})
      }
      
    }
    return times
  }


