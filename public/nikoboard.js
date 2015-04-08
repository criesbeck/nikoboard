function updateBoard() {
  var query = new Parse.Query("Reading");
  query.equalTo("readingDay", getToday());
  query.ascending("team")
  query.find().then(displayResults, displayError);
}

function displayResults(readings) {
  var template = $("#board-template").html();
  var data = groupByTeam(readings);
  var rendered = Mustache.render(template, data);
  $("#team-board").html(rendered);
}
    
function groupByTeam(readings) {
  var data = { teams: [] };
  readings.forEach(function(reading) {
    addMood(data, reading.get("team"), reading.get("mood"));
  });
  return data;
}

function addMood(data, team, mood) {
  getTeamData(data, team).moods.push(mood);
}

function getTeamData(data, team) {
  var teamData;
  for (var i = 0; i < data.teams.length; ++i) {
    teamData = data.teams[i];
    if (teamData.name == team) break;
  };
  if (!teamData) {
    teamData = { name: team, moods: [] };
    data.push(teamData);
  }
  return teamData;
}

function getToday() {
  return (new Date()).toDateString();
}

$(function () {
  Parse.initialize("UgbmEOPXmE1h4MAjDtxRNok3yiOgpxCIaqKE7U1c", "2emXdn6IV5MqLmdKPLKmtt4OVB2XQvadbAB1Zuc1");
  updateBoard();
});
