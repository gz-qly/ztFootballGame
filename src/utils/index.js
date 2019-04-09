export function toMoney(num) {
  num = num.toFixed(2);
  // num = parseFloat(num)
  num = num.toLocaleString();
  return num;//返回的是字符串23,245.12保留2位小数
}
//倒计时
export function CountDown(targetDate) {
  //var targetDate = '2018-05-28 ';  // 目标日期（活动截止时间）
  // 获取本地当前时间，截止时间 - 当前时间 = 倒计时时间
  var Today = new Date();
  var endDate = new Date(targetDate);
  var leftTime = endDate.getTime() - Today.getTime();
  var leftSecond = parseInt(leftTime / 1000);
  var Day = Math.floor(leftSecond / (60 * 60 * 24));
  var Hour = Math.floor((leftSecond - Day * 24 * 60 * 60) / 3600);
  var Minute = Math.floor((leftSecond - Day * 24 * 60 * 60 - Hour * 3600) / 60);
  var Second = Math.floor(leftSecond - Day * 24 * 60 * 60 - Hour * 3600 - Minute * 60);

  if (Day < 0) {
    //clearInterval(timer); // 清除定时器
    // document.getElementById('endTips').innerHTML = '活动已结束';
    // document.getElementById('wrapDate').style.display = 'none';
    return "no";
  } else {
    var time = { Day, Hour, Minute, Second }
    return time
  }
}