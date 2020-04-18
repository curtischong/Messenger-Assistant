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
    })
    let formattedTimes = [];
    times.forEach((time) => {
      formattedTimes.push(time.format("h:mma"))
    })
    return formattedTimes;
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

  let characterCountInit = () => {
    console.log("Init Character Count")
    let charCntChartCtx = document.getElementById('charCntChart').getContext('2d');
    return getCharCntChart(charCntChartCtx);
  }