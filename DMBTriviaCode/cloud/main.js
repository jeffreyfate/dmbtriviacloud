function getCount(total, response) {
    var query = new Parse.Query("Question");
    query.limit(1000);
    query.skip(total);
    query.count({
        success: function(count) {
            total += count;
            if (count == 1000) {
                getQuestionCount(total, response);
            }
            else {
                var jsonObject = {"total": total};
                response.success(jsonObject);
            }
        },
        error: function(error) {
            console.log("Error fetching question count: " + error.message);
        }
    });        
}

Parse.Cloud.define("getQuestionCount", function(request, response) {
    getCount(0, response);
});