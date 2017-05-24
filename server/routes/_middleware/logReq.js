const chalk = require('chalk');
const moment = require('moment')

function logReq( msg, req, res, next ) {

    const { query, params, session, user, body } = req

    console.log("\n\n\n");
    console.log("--".repeat(40));
    console.log(msg);
    console.log( moment().format('MMMM Do YYYY, h:mm:ss a') );
    console.log("--".repeat(40));

    console.log( chalk.white.bgBlue(`REQ.QUERY`) );
    console.log( chalk.blue( JSON.stringify( query , null, 2 ) ) );

    console.log( chalk.black.bgGreen(`REQ.PARAMS`) );
    console.log( chalk.green( JSON.stringify( params , null, 2 ) ) );

    console.log( chalk.black.bgYellow(`REQ.SESSION`) );
    console.log( chalk.yellow( JSON.stringify( session , null, 2 ) ) );

    console.log( chalk.black.bgMagenta(`REQ.USER`) );
    console.log( chalk.magenta( JSON.stringify( user , null, 2 )  ) );

    console.log( chalk.white.bgRed(`REQ.BODY`) );
    console.log( chalk.red( JSON.stringify( body , null, 2 )  ) );


    // const dataReq = { query, params, session, user, body }
    //const reqReadyToBeWritten = cycle.decycle(req)
    // const reqStringified = JSON.stringify( dataReq , null, 2 )
    // console.log(dataReq);
    // console.log(`${__base}data/request${++counter}.json`);
    // console.log("---".repeat(20));
    //fs.writeFile( `${__base}data/request${++counter}.json`, reqStringified)

    next()
}

module.exports = logReq