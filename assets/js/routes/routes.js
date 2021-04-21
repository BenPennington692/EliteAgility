var fs = require("fs");
var appRouter = function (app) {



  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });

  app.get("/movies", function (req, res) {
    var obj;
    fs.readFile("./" + "datahubio_oscar_data_json.json", 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.status(200).send(obj);
    });
    
  });

 app.get("/movies/category/:cat", function (req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       users.push({
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           username: faker.internet.userName(),
           email: faker.internet.email()
        });
     }

     res.status(200).send(users);
    
   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }

 });
}

module.exports = appRouter;