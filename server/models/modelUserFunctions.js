var dacFactory = require('../dac/dac');
var dacUserFunctions = require('../dac/dacUserFunctions');

var UserFunction = {
    Functionname: '',
    Creationdate: '',
    Sql: '',
    Functype: 'postgis'
};

var UserFunctionsColl = [];

module.exports = UserFunction;

UserFunction.loadUserFunction = function (rows) {
    UserFunctionsColl = [];
    for (var r in rows) {
        var userfunction = Object.create(UserFunction);
        userfunction.Functionname = rows[r].functionname;
        userfunction.Creationdate = rows[r].creationdate;
        userfunction.Sql          = rows[r].sql;
        userfunction.Functype     = rows[r].functype;
        UserFunctionsColl.push(userfunction);
    }
}

UserFunction.getUserFunctions = function (config, email, callback) {

    dacFactory.init(config, function (client) {
        dacUserFunctions.getUserFunctions(client, email, function(data) {
            UserFunction.loadUserFunction(data.rows);
            callback(data = { obj: UserFunctionsColl, error: data.error } );
        });

    });
}


