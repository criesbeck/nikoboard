var moodImages = {
  happy: "face-happy",
  neutral: "face-neutral",
  nervous: "face-sad"
};

function updateBoard() {
  var query = new Parse.Query("Reading");
  query.equalTo("readingDay", getToday());
  query.ascending("team")
  query.find().then(displayResults, displayError);
}

function displayResults(readings) {
  var template = $("#board-template").html();
  var data = groupByTeam(readings);
  data.day = getToday();
  var rendered = Mustache.render(template, data);
  $("#team-board").html(rendered);
}

function displayError(error) {
  $("#team-board").html(error.message);
}
    
function groupByTeam(readings) {
  var data = { teams: [] };
  readings.forEach(function(reading) {
    addMood(data, reading.get("team"), reading.get("mood"));
  });
  return data;
}

function addMood(data, team, mood) {
  getTeamData(data, team).moods.push(getMoodImage(mood));
}

function getTeamData(data, team) {
  var teamData;
  for (var i = 0; i < data.teams.length; ++i) {
    teamData = data.teams[i];
    if (teamData.name == team) break;
  };
  if (i == data.teams.length) {
    teamData = { name: team, moods: [] };
    data.teams.push(teamData);
  }
  return teamData;
}

function getMoodImage(mood) {
  return moodImages[mood];
}

function getToday() {
  return (new Date()).toDateString();
}

$(function () {
  Parse.initialize("UgbmEOPXmE1h4MAjDtxRNok3yiOgpxCIaqKE7U1c", "2emXdn6IV5MqLmdKPLKmtt4OVB2XQvadbAB1Zuc1");
  updateBoard();
});
