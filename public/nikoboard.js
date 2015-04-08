function submitMood() {
  var Reading = Parse.Object.extend("reading");
  var reading = new Reading();
  var team = $("input:radio[name=team]:checked").val();
  var netid = $("input[name=netid]").val();
  var mood = $("input:radio[name=mood]:checked").val()
  if (team && netid && mood) {
    var data = { team: team, netid: netid, mood: mood };
    reading.save().then(function (obj) {
      console.log("saved " + obj);
    }, function (err) {
      console.log(err);
    });
  }
  else {
    alert("specify all three items");
  }
  return false;
}

$(function () {
  Parse.initialize("UgbmEOPXmE1h4MAjDtxRNok3yiOgpxCIaqKE7U1c", "2emXdn6IV5MqLmdKPLKmtt4OVB2XQvadbAB1Zuc1");
  $("#submit-btn").on("click", submitMood);
});
