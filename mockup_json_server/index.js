var jsonServer = require('json-server')
var server = jsonServer.create()

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults)

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
  if(arr.length == 3 && !isNaN(arr[2]))
    item = item.substring(0, item.length - 1);
  response[item] = res.locals.data;

  // Add meta tags
  if (item == "articles" && arr.length == 2)
    response["meta"] = {
        total: router.db.object["articles"].length
    };

  // Handle task
  if(item == "task") {
    // Add organizator to result
    response["organisators"] = router.db.object["organisators"].filter(function(v){ return v["id"] == res.locals.data["author"]; });
  }

  res.jsonp(response);
}

server.use(router)

server.listen(3000)