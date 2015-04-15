
function updateBoard() {
  var course = getCourse();
  var query = new Parse.Query("Reading");
  query.equalTo("course", course);
  query.descending("createdAt");
  query.limit(100); // assume at most 100 readings per day
  query.find().then(displayResults, displayError);
}

function getCourse() {
  var match = /[?&]course=([^&]+)/.exec(window.location.search);
  return match ? match[1] : null; 
}

function displayResults(readings) {
  var template = $("#board-template").html();
  if (readings && readings.length > 0) {
    var data = { 
      course: readings[0].get("course") || "this course", 
      localDay: readings[0].createdAt.toDateString(),
      readingDay: readings[0].get("readingDay"),
      teams: [] 
    };
    groupDayByTeam(data, readings);
    sortData(data);
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
    if (reading.get("readingDay") == data.readingDay && isNew(netids, reading.get("netid"))) {
      addReading(data, reading.get("team"), reading.get("mood"));
    };
  });
}

// sort by team and mood
// Note: happy,neutral,sad lexical order is just what I want 
// Note: adding query.ascending("team,mood") after query.descending("createdAt")
// messed up createdAt order

function sortData(data) {
  data.teams.forEach(function(team) {
    team.moods.sort();
  });
  data.teams.sort(compareTeam);
}

function compareTeam(team1, team2) {
  return team1.name.localeCompare(team2.name);
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
