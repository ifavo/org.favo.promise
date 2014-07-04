var Promise = require('org.favo.promise');

var win = Titanium.UI.createWindow({
	layout: 'vertical'
});
win.open();

var btn1 = Titanium.UI.createButton({
	title: "Test Success",
	width: '50%',
	center: {x: '50%'},
	height: 24
});
win.add(btn1);

btn1.addEventListener("click", function () {
	testSuccess().then(function (data) {
	  console.log("Hello " + data);
	});
});



var btn2 = Titanium.UI.createButton({
	title: "Test Error",
	width: '50%',
	center: {x: '50%'},
	height: 24
});
win.add(btn2);


btn2.addEventListener("click", function () {
	testError().then(function (data) {
	  console.log("Hello " + data);
	}, function (err) {
	  console.log("received error: " + err);
	});
});

	

var btn3 = Titanium.UI.createButton({
	title: "Test Next",
	width: '50%',
	center: {x: '50%'},
	height: 24
});
win.add(btn3);

btn3.addEventListener("click", function () {
	testSuccess().then(function () {
		console.log("success");
	})
	.next(function() {
		console.log("first success"); // called after 2000ms.
		return "ok";
	}, 2000)
	.next(function(res) {
	    console.log(res); // call after more 2000ms, and res is "ok"
	}, 2000);
});



	

var btn4 = Titanium.UI.createButton({
	title: "Test When",
	width: '50%',
	center: {x: '50%'},
	height: 24
});
win.add(btn4);

btn4.addEventListener("click", function () {
	var param = "world";

	Promise.when(testSuccess(), testError(), param)
	.then(function (res) {
		console.log("result", res);
	});
	
	Promise.when(testSuccess(), testError(), param)
	.next(function (data) {
		return "aloha " + data;
	})
	.then(function (res) {
		console.log("result", res);
	});

	Promise.when(testSuccess(), param)
	.next(function (data) {
		return "hi " + data;
	})
	.then(function (res) {
		console.log("success", res);
	}, function (res) {
		console.log("error", res);
	});

	Promise.when(testError(), param)
	.next(function (data) {
		return "hello " + data;
	})
	.then(function (res) {
		console.log("success", res);
	}, function (res) {
		console.log("error", res);
	});
});




/**	
 * test function
 *  @return {Promise}
 */
function testSuccess () {
  var promise = Promise.defer();

  setTimeout(function () {
    promise.resolve("world"); // resolve = success
  }, 1000);

  return promise;
}



/**
 * test function
 *  @return {Promise}
 */
function testError () {
  var promise = Promise.defer();

  setTimeout(function () {
    promise.reject("error information"); // reject the promise = error
  }, 1000);

  return promise;
}

