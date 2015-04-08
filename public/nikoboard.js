function submitMood() {
  var form = $("#mood-form");
  var Reading = Parse.Object.extend("reading");
  var reading = new Reading();
  var team = form["team"].value;
  var netid = form["netid"].value;
  var mood = form["mood"].value;
  if (team && netid && mood) {
    console.log({ team: team, netid: netid, mood: mood });
    return false;
  }
  else {
    alert("fill in all three fields");
    return false;
  }
  
}

$(function () {
  Parse.initialize("UgbmEOPXmE1h4MAjDtxRNok3yiOgpxCIaqKE7U1c", "2emXdn6IV5MqLmdKPLKmtt4OVB2XQvadbAB1Zuc1");
  $("#submit-btn").on("click", submitMood);
});
