
function submitMood() {
  var team = $("input[name=team]").val();
  var netid = $("input[name=netid]").val();
  var mood = $("input:radio[name=mood]:checked").val()
  if (mood) {
    var Reading = Parse.Object.extend("Reading");
    var reading = new Reading();
    var data = { team: team, netid: netid, mood: mood };
    reading.save(data).then(function (obj) {
      $("#save-result").html("<span class='ok'>Saved!</span>");
    }, function (err) {
      $("#save-result").html("<span class='not-ok'>" + error.message + "</span>");
    });
  }
  else {
    $("#save-result").html("<span class='not-ok'>Select team and mood, and enter your 6-character alphanumeric netID</span>");
  }
  return false;
}

function updateSubmitButton() {
  $("#submit-btn").prop("disabled", !validInputs());
}

function validInputs() {
  return $("input:radio[name=mood]:checked").val();
}

// to fix: button checked state not reflected on reload
$(function () {
  Parse.initialize("UgbmEOPXmE1h4MAjDtxRNok3yiOgpxCIaqKE7U1c", "2emXdn6IV5MqLmdKPLKmtt4OVB2XQvadbAB1Zuc1");
  $("input:radio[name=mood]").on("change", updateSubmitButton);
  $("#submit-btn").on("click", submitMood);
  updateSubmitButton();
});
