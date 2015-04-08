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
  Parse.initialize("cGac6sS2WJtg0akDM5dgy8MJRoiQm6anTUtZ5qs7", "4MrXkqIN8cx9tw9sxKukLckwLcepfHRW3CqsrZcC");
  $("#submit-btn").on("click", submitMood);
});
