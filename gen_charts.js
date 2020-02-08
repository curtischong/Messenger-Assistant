// Character Count Chart
// TODO: add the axis titles for this chart
let getCharCntChart = (ctx) => {
return new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: [],
        datasets: []
      },
      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxRotation: 90,
            }
          }]
        }
      }
  });
}

let getConvoTimes = (convo) => {
  let times = [];
  convo.forEach((msg) => {
    if(msg.type === "text"){
      if(times.length == 0){
        times.push(msg.timeSent);
      }else if(times[times.length - 1] != msg.timeSent){
        times.push(msg.timeSent);
      }
    }
  });
  return times;
}

let getPeopleCharCnts = (convo) => {
  let personMsgs = {}
  convo.forEach((msg) => {
    if(msg.type != "text"){
      return;
    }
    let msgPoint = {
        x: msg.timeSent,
        y: msg.msg.length,
    };
    if(!(msg.person in personMsgs)){
      personMsgs[msg.person] = [msgPoint];
    }else{
      personMsgs[msg.person].push(msgPoint);
    }
  });
  return personMsgs;
}

let getCharCntDatasets = (peopleCharCnts) => {
  let datasets = []
  for(let key in peopleCharCnts) {
    let val = peopleCharCnts[key];
    let color = "#"+((1<<24)*Math.random()|0).toString(16);
    if(key == YOUR_NAME){
      color = 'rgb(255, 99, 132)';
    }
    datasets.push({
      label: key,
      data: val,
      backgroundColor: color,
      borderColor: color,
      fill: false,
      borderWidth: 1,
      pointRadius: 1,
    });
  };
  return datasets;
}

let generateCharCntChart = (chart, convo) => {
  let peopleCharCnts = getPeopleCharCnts(convo);
  let convoTimes = getConvoTimes(convo);
  let charCntDatasets = getCharCntDatasets(peopleCharCnts);
  chart.data.labels = convoTimes;
  chart.data.datasets = charCntDatasets;
  chart.update();
}

// Response Chart

let generateResponseChart = (x,y) => {
  var ctx = document.getElementById('responseChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'scatter',

      // The data for our dataset
      data: {
          datasets: [{
            label: "y=x",
            borderColor: "#fff",
            borderWidth: 1,
            pointBackgroundColor: ['#000'],
            pointRadius: 1,
            fill: false,
            showLine: true,
            data: [{
              x: 0.0,
              y: 0.0
            },{
              x: 0.0,
              y: 0.0,
            }]
          }]
      },
      // Configuration options go here
      options: {}
  });
  chart = null;
}

