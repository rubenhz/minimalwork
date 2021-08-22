
export function to12HourFormat(dt) {
  var hours = dt.getHours() ; // gives the value in 24 hours format
  var AmOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12;
  var minutes = dt.getMinutes() == 0 ? '00' : dt.getMinutes();
  var finalTime = `${hours}:${minutes} ${AmOrPm}`;
  return finalTime;
}

export function guid() {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
}

export function shortenText(text, len) {
  if (text.length >= len) {
    return text.slice(0, len) + '...';
  } else {
    return text;
  }
}

export function getUrgencyColor(timeLeft) {
  const oneHour = 3600000;
  const oneDay = oneHour * 24;

  let urgencyColor;
  if (timeLeft <= oneHour) {
    urgencyColor = 'red';
  } else if (timeLeft <= oneHour * 5) {
    urgencyColor = 'orange';
  } else if (timeLeft <= oneDay / 2) {
    urgencyColor = 'yellow';
  } else if (timeLeft <= oneDay) {
    urgencyColor = 'blue'
  } else {
    urgencyColor = 'black';
  }


  return urgencyColor;

}

// if (timeLeft <= oneDay) {
//   urgencyColor = {background: 'blue'};
// } else if (timeLeft <= oneDay / 2) {
//   urgencyColor = {background: 'yellow'};
// } else if (timeLeft <= oneHour * 5) {
//   urgencyColor = {background: 'orange'};
// } else {
//   urgencyColor = {background: 'black'};
// }
