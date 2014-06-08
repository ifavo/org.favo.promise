CommonJS Promise Module for Titanium
========


    var Promise = require('org.favo.promise');

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


    testSuccess().then(function (data) {
      console.log("Hello " + data);
    });

    testError().then(function (data) {
      console.log("Hello " + data);
    }, function (err) {
      console.log("received error: " + err);
    });


	Promise.defer()
	.next(function() {
	    return "ok"; // call after 1000ms.
	}, 2000);
	.next(function(res) {
	    console.log(res); // call after more 2000ms, and res is "ok"
	}, 2000);