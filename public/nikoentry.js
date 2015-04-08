function submitMood() {
  var team = $("input:radio[name=team]:checked").val();
  var netid = $("input[name=netid]").val();
  var mood = $("input:radio[name=mood]:checked").val()
  if (team && netid && mood) {
    var Reading = Parse.Object.extend("Reading");
    var reading = new Reading();
    var data = { team: team, netid: netid, mood: mood };
    reading.save(data).then(function (obj) {
      console.log(obj);
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
