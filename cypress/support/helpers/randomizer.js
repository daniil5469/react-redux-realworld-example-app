export function makeEmail() {
  var strValues = "abcdefghijklmnopqrstuvwxyz1234567890";
  var strEmail = "";
  var strTmp;
  for (var i = 0; i < 10; i++) {
    strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
    strEmail = strEmail + strTmp;
  }
  strTmp = "";
  strEmail = strEmail + "@";
  for (var j = 0; j < 8; j++) {
    strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
    strEmail = strEmail + strTmp;
  }
  strEmail = strEmail + ".com"
  return strEmail;
}

export function makeUsername() {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var strUsername = '';
  for (var ii = 0; ii < 15; ii++) {
    strUsername += chars[Math.floor(Math.random() * chars.length)];
  }
  return strUsername;
}

export function makePassword() {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var strPassword = '';
  for (var ii = 0; ii < 15; ii++) {
    strPassword += chars[Math.floor(Math.random() * chars.length)];
  }
  return strPassword;
}