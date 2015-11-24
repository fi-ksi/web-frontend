var jsonServer = require('json-server')
var server = jsonServer.create()

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults)

/*server.use(jsonServer.rewriter({
  '/users/:id/scores/:id': '/scores/:id'
}));*/

// Returns an Express router
var router = jsonServer.router('db.json')
//console.log(router.db.object)

router.render = function (req, res) {
  var url = req.url;
  var pos = url.indexOf("?");
  if(pos < 0)
    pos = url.lenght;
  var arr = url.substring(0, pos).split("/");
  var response = {};
  var item = arr[1];

  // Get rid of the s
  if(item == "categories") {
    item = "category";
  }
  else if(arr.length == 3 && !isNaN(arr[2])) {
    item = item.substring(0, item.length - 1);
  }
  response[item] = res.locals.data;

  // Add meta tags
  if (item == "articles" && arr.length == 2)
    response["meta"] = {
        total: router.db.object["articles"].length
    };

  // Handle task
  if(item == "task") {
    // Add organizator to result
    //response["organisators"] = router.db.object["organisators"].filter(function(v){ return v["id"] == res.locals.data["author"]; });
  }

  // Handle profile
  if(item == "profile") {
    response["taskScores"] = router.db.object["taskScores"].filter(function(v) {
        return res.locals.data[0]["results"].indexOf(v["id"]) > -1;
    });
  }

  // Handle taskDetails
  if(item == "taskDetail") {
    console.log(res.locals.data);
    response["modules"] = router.db.object["modules"].filter(function(v) {
        return res.locals.data["modules"].indexOf(v["id"]) > -1;
    });
    response["moduleScores"] = router.db.object["moduleScores"].filter(function(v) {
        return res.locals.data["modules"].indexOf(v["id"]) > -1;
    });
    response["userScores"] = router.db.object["userScores"].filter(function(v) {
        return res.locals.data["best_scores"].indexOf(v["id"]) > -1;
    });
  }

  // Handle profile
  if(item == "threadDetail") {
    response["posts"] = router.db.object["posts"].filter(function(v) {
        return res.locals.data["root_posts"].indexOf(v["id"]) > -1;
    });
  }


  res.jsonp(response);
}

server.use(router)
server.listen(3000)
