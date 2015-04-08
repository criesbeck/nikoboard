
function updateBoard() {
  var query = new Parse.Query("Reading");
  query.descending("readingDay");
  query.ascending("team,mood");
  query.limit(100); // assume at most 100 readings per day
  query.find().then(displayResults, displayError);
}


function displayResults(readings) {
  var template = $("#board-template").html();
  if (readings && readings.length > 0) {
    var data = { day: readings[0].get("readingDay"), teams: [] };
    groupDayByTeam(data, readings);
    var rendered = Mustache.render(template, data);
    $("#team-board").html(rendered);
  }
}

function displayError(error) {
  $("#team-board").html(error.message);
}

// collect only most recent day's readings
// ignore duplicate entries
function groupDayByTeam(data, readings) {
  var netids = [];
  readings.forEach(function(reading) {
    if (reading.get("readingDay") == data.day && isNew(netids, reading.get("netid"))) {
      addReading(data, reading.get("team"), reading.get("mood"));
    };
  });
}

function isNew(lst, x) {
  if (lst.indexOf(x) == -1) {
    lst.push(x);
    return true;
  }
  else {
    return false;
  }
}

function addReading(data, team, mood) {
  for (var i = 0; i < data.teams.length; ++i) {
    if (data.teams[i].name == team) {
      data.teams[i].moods.push(mood);
      return;
    };
  };
  data.teams.push({ name: team, moods: [ mood ] });
}

$(function () {
  Parse.initialize("UgbmEOPXmE1h4MAjDtxRNok3yiOgpxCIaqKE7U1c", "2emXdn6IV5MqLmdKPLKmtt4OVB2XQvadbAB1Zuc1");
  updateBoard();
});
