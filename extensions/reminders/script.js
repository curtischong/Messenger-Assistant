let deleteReminders = () => {
  let items = {
    "reminders": []
  }
  chrome.storage.sync.set({ "reminders": items },function(){
    console.log("deleted reminders!");
  });
};

function toTimeZone(time) {
  return moment.utc(time).local().format()
}

let secondsToTime = (seconds) => {
  var days = Math.floor(seconds / (3600*24));
  seconds  -= days*3600*24;
  var hrs   = Math.floor(seconds / 3600);
  seconds  -= hrs*3600;
  var mnts = Math.floor(seconds / 60);
  seconds  -= mnts*60;
  if(days > 0){
    if(days == 1) return days + " Day";
    return days + " Days";
  }
  if(hrs > 0){
    if(hrs == 1) return hrs + " Hr";
    return hrs + " Hrs";
  }
  if(mnts == 1) return mnts + " Min";
  return mnts + " Mins";
}

let getReminders = (callback) => {
  chrome.storage.sync.get("reminders", function(result){
    items = result["reminders"];
    callback(items);
  });
};

let addReminders = (text, hour, day) => {
  getReminders((items) => {
    if(items == undefined || items == null){
      console.log("first reminder");
      items = {}
      items["reminders"] = [];
    }else if (Object.keys(items).length === 0 || items.length === 0){
      console.log("first reminder");
      items["reminders"] = [];
    }

    var reminderTime = new Date();
    console.log("cur time");
    reminderTime.setTime(reminderTime.getTime() +  (hour * 60 * 60 * 1000) + (day * 24 * 60 * 60 * 1000));

    items["reminders"].push({
      text: text,
      reminderTime: reminderTime.getTime()
    });
    console.log(items);
    chrome.storage.sync.set({ "reminders": items },populateReminders);
  });
};


let deleteReminder = (reminderTime) => {
  getReminders((items) => {
    let reminders = items["reminders"];
    for(let i = 0; i < reminders.length; i++) {
      if(reminders[i].reminderTime == reminderTime){
        reminders.splice(i,1);
        break;
      }
    }
    let newItems = {
      "reminders": reminders
    };
    chrome.storage.sync.set({ "reminders": newItems },populateReminders);
  });
}

let getReminderDiv = (isRed, timeStr, text, reminderTime) => {
  let redColor = isRed ? "background-color: #e0bae0;" : "";
  let reminderDateStr = isRed ? timeStr + " ago" : "in " + timeStr;
  return `
    <div class="reminderDiv" style="${redColor}">
      <p class="reminderName">${text}</p>
      <button class="delReminderBtn" reminderTime=${reminderTime}>X</button>
      <p class="reminderDate">${reminderDateStr}</p>
    </div>
  `;
}


let populateReminders = () => {
  getReminders((items) => {
    $("#messageReminders").empty();
    if(items === undefined || items["reminders"] === undefined){
      console.log("no reminders detected");
      return;
    }
    items["reminders"].sort(function(a, b) {
      return a.reminderTime - b.reminderTime;
    })

    items["reminders"].forEach(function(reminder){
      let reminderTime = reminder["reminderTime"];
      let currentDate = new Date();
      let text = reminder["text"];

      let reminderIsRed = false;
      let timeStr = "";
      let dateDiff = (currentDate.getTime() - reminderTime)/1000;
      console.log(dateDiff);
      if(dateDiff > 0){ // the reminder needs to be red
        reminderIsRed = true;
        timeStr = secondsToTime(dateDiff);
      }else{
        timeStr = secondsToTime(-dateDiff);
      }

     let reminderDiv = getReminderDiv(reminderIsRed, timeStr, text, reminderTime);
     $("#messageReminders").append(reminderDiv);
    });
    $(".delReminderBtn").on("click",function(e){
      let reminder = $(e.target);
      let reminderTime = parseInt(reminder.attr("reminderTime"));
      deleteReminder(reminderTime);
    });
  });
};


let checkAddReminder = (key) => {
    if (key.keyCode != 13) return; // press enter
    let text = $("#remindTextInput")[0].value;
    let hour = $("#remindHourInput")[0].value;
    let day = $("#remindDayInput")[0].value;
    if(text == "" | hour == "" | day == "") return;
    $("#remindTextInput")[0].value = "";
    $("#remindHourInput")[0].value = "";
    $("#remindDayInput")[0].value = "";
    addReminders(text, hour, day);
};

let initReminders = () => {
  console.log("init reminders")
  $("#remindTextInput").keydown(function (key) {
      checkAddReminder(key);
  });
  $("#remindHourInput").keydown(function (key) {
      checkAddReminder(key);
  });
  $("#remindDayInput").keydown(function (key) {
      checkAddReminder(key);
  });
  $("#deleteRemindersBtn").on("click", function(){
    deleteReminders();
  });
  populateReminders();
};