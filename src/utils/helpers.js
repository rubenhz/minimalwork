
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
  const oneDay = 86400000;

  const opacity = 1 - (timeLeft / (oneDay / 0.8));
  const opacityExponential = 1 - ((5**(timeLeft/oneDay)) - 1);

  const colors = {
    late: {backgroundColor: 'rgb()'},
    dueInLessThan12Hours: {backgroundColor: `rgb(255, 180, 0, ${opacityExponential})`},
    dueInLessThan24Hours: {backgroundColor: 'rgb(255, 180, 0, 0.3)'},
    dueInLessThan3Days: {backgroundColor: 'rgb(98, 148, 51, 0.3)'},
    default: {backgroundColor: 'rgb()'}
  }

  let urgencyColor;

  return colors.dueInLessThan12Hours;

}
