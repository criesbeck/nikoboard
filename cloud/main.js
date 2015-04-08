
// get the day of the reading so we can query mood by days 
Parse.Cloud.beforeSave("Reading", function(request, response) {
  var today = new Date();
  request.object.set("readingDay", today.toDateString());
  response.success();
});
