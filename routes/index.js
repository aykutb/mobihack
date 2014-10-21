var express = require('express');
var fs = require('fs');
var moment = require('moment');
var crypto = require('crypto');
var path = require('path');
var Q =require('q');
var router = express.Router();

moment().format();
var fileindex = 0;

var writeFile = Q.denodeify(fs.writeFile);

/*
This function calculates 1000th digit of 22/7. It's not pi, but it's close.
Eventually, calculation of pi is a whole different story.
In this method, I've just simulated an operation that is kind of hard for CPU.
Algorithm:
 - Change dividend 999 times via using modulus operation and multiplying by 10 for the next.
 - Calculate last result.
 */
function pi1000th() {
    var dividend = 22;
    var divider = 7;
    var remainder = 0;
    var result = 0;
    for(var i=0; i<999 ; i++)
    {
        remainder = dividend % divider;
        dividend = remainder * 10;
    }
    result = Math.floor(dividend/divider);
}

/*
This method writes a line to a new file for each request.
To make filenames unique, it uses global variable 'fileIndex' as an index.
Algorithm:
- Get IP adress from original request
- Get unixTimeStamp from moment lib
- Get random string from helper
- Unite them as a line
- Write this line to a file which is denodified for Q
- return 0 for success, return error message for error as promise.
 */
function writeLogFileForIp(ip)
{
    var deferred = Q.defer();
    var unixTimeStamp = moment().unix();
    var line = ip.concat('::').concat(unixTimeStamp).concat('::').concat(randomStringGen(256));

    var fileName = path.join(__dirname,(fileindex++).toString());
    console.log(fileName);
    var result="";
    writeFile(fileName, line, 'utf-8').then(function(err) {
        if(err)
        {
            result = err.message;
            deferred.resolve(result);
        }
        else
        {
            result = 0;
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}

/*
This helper method can create a random string with given length long.
It uses crypto lib for creating bytes as alphanumeric char array index.
 */
function randomStringGen (numOfChars) {
    var chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(numOfChars)
        , value = new Array(numOfChars)
        , len = chars.length;

    for (var i = 0; i < numOfChars; i++) {
        value[i] = chars[rnd[i] % len]
    };
    return value.join('');
}
/*
GET First Assignment
 */
router.get('/shoot-for-my-cpu', function(req, res) {
    try {
        pi1000th();
        res.json({ status: 0, msg: '' });
    }catch(ex)
    {
        res.json({ status: 1, msg: ex.message });
    }
});

/*
GET Second Assignment
 */
router.get('/shoot-for-my-disk',function(req,res){
    var ip = req.connection.remoteAddress;
    var result="";

    writeLogFileForIp(ip).then(function(res){
        result = res;
    }).then(function(){
        if(result === 0)
        {
            res.json({ status: 0, msg: '' });
        }
        else
        {
            res.json({ status: 1, msg: result });
        }
    });
});

module.exports = router;
