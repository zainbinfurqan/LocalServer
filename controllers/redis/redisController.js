

// const redis = require('redis');
// const client = redis.createClient();


// exports.redisFunctions = async (req, res, next) => {
//   try {

//     //-----key value string-------//
//     // client.set("name", "Zain Ahmed", function (err, data) {
//     //   console.log(data)
//     // })



//     //-----key value Number-------//
//     // client.set("age", 24, function (err, data) {
//     //   console.log(data)
//     // })



//     //-----push in list from left-------//
//     // client.lpush("listAry", "b", (err, data) => {
//     //   console.log(data)
//     // })

//     //-------push in list from right
//     // client.rpush("listAry", "d", (err, data) => {
//     //   console.log(data)
//     // })

//     //----print list -------//
//     // client.lrange("listAry", 0, -1, function (err, data) {
//     //   console.log(data)
//     // })

//     //--------removie from left
//     // client.rpop("listAry", (err, data) => {
//     //   console.log(data)
//     // })

//     //--------set value in list at index----------//
//     // client.lset("listAry", -1, "f", (err, data) => {
//     //   console.log(data)
//     // })

//     //--------remove value from list of define element and number ----------//
//     // client.lrem("listAry", 2, "a", (err, data) => {
//     //   console.log(data)
//     // })

//     //-- get elment of particular index from list----//
//     // client.LINDEX("listAry", 1, (err, data) => {
//     //   console.log(data)
//     // })

//     // client.lrange("listAry", 0, -1, function (err, data) {
//     //   console.log(data)
//     // })

//     // client.flushall()

//     res.json({ message: "server is up and running with redis" });
//   } catch (error) {
//     next({ message: error });
//   }


// }