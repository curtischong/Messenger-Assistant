const TIME_FORMAT = "h:mma"

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
    let formattedTimes = [];
    convo.forEach((msg) => {
      if(msg.type === "text"){
        formattedTimes.push(msg.timeSent.format(TIME_FORMAT))
      }
    })

    let times = [];
    formattedTimes.forEach((time) => {
      if(times.length == 0){
        times.push(time);
      }else if(times[times.length - 1] != time){
        times.push(time);
      }
    })

    return times;
  }

  let getPeopleCharCnts = (convo) => {
    let personMsgs = {}
    convo.forEach((msg) => {
      if(msg.type != "text"){
        return;
      }
      let msgPoint = {
          x: msg.timeSent.format(TIME_FORMAT),
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
    for(let name in peopleCharCnts) {
      let dataPoints = peopleCharCnts[name];
      // TODO(Curtis): Stick this into a utils package.
      let color = "#"+((1<<24)*Math.random()|0).toString(16);
      if(name == YOUR_NAME){
        color = YOUR_LINE_COLOUR;
      }
      datasets.push({
        label: name,
        data: dataPoints,
        backgroundColor: color,
        borderColor: color,
        fill: false,
        borderWidth: 1,
        pointRadius: 1,
      });
    };
    return datasets;
  }

  let characterCountGenerateChart = (initVars, convo) => {
    let chart = initVars.characterCount
    let peopleCharCnts = getPeopleCharCnts(convo);
    let convoTimes = getConvoTimes(convo);
    let charCntDatasets = getCharCntDatasets(peopleCharCnts);
    chart.data.labels = convoTimes;
    chart.data.datasets = charCntDatasets;
    chart.update();
  }

  let characterCountInit = () => {
    console.log("Init Character Count")
    // TODO(Curtis): Known bug - this script runs before the chart canvas is created -> throws error here.
    let charCntChartCtx = document.getElementById('charCntChart').getContext('2d');
    return getCharCntChart(charCntChartCtx);
  }