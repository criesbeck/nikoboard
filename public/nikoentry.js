function displayTeamButtons(teams) {
  var template = $("#team-btn-template").html();
  var data = { teams: teams, visibleName: function() { return capitalize(this); } };
  var rendered = Mustache.render(template, data);
  $("#team-btn-group").html(rendered);
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.substring(1);
}

function submitMood() {
  var team = $("input:radio[name=team]:checked").val();
  var netid = $("input[name=netid]").val();
  var mood = $("input:radio[name=mood]:checked").val()
  if (team && mood && isValidNetId(netid)) {
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

function isValidNetId(netid) {
  return netid && /[a-zA-Z]{3}\d{3}/.test(netid);
}

function updateSubmitButton() {
  $("#submit-btn").prop("disabled", !validInputs());
}

function validInputs() {
  return $("input:radio[name=team]:checked").val() &&
    $("input[name=netid]").val() &&
    $("input:radio[name=mood]:checked").val();
}

// to fix: button checked state not reflected on reload
$(function () {
  Parse.initialize("UgbmEOPXmE1h4MAjDtxRNok3yiOgpxCIaqKE7U1c", "2emXdn6IV5MqLmdKPLKmtt4OVB2XQvadbAB1Zuc1");
  displayTeamButtons(["aqua", "blue", "brown", "gold", "green", 
    "navy", "orange", "purple", "red", "yellow"
  ]);
  $("input").on("change", updateSubmitButton);
  $("#submit-btn").on("click", submitMood);
  updateSubmitButton();
});
