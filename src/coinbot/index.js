// @flow
require("dotenv").config();

const moment = require("moment");

const logIt = require("../_helpers/logger.js");
const { FIFTEEN_MINS_MS } = require("../_helpers/constants.js");

const DEFAULT_COINS = ["BTC", "ETH", "LTC"];

const { check } = require("./core");

// run loops over defined coins and checks the state of that coin against past trades.
async function run() {
  // TODO: check coin currency here and automate which coins to get.
  let decisions = [];
  for (let i = 0; i <= DEFAULT_COINS.length - 1; i++) {
    try {
      decisions = await check(DEFAULT_COINS[i]);
    } catch (e) {
      logIt({
        form: "error",
        message: e
      });
      break;
    }

    if (Array.isArray(decisions)) {
      decisions.map(({ id, advice, message }) =>
        logIt({
          form: "notice",
          message
        })
      );
    }
    console.log("-----------");
  }
  console.log(">>>>>>>>>>>>");
  logIt({
    form: "notice",
    message: "RUN COMPLETE >>>"
  });
  logIt({
    message: `checking again in ${moment()
      .add(FIFTEEN_MINS_MS, "milliseconds")
      .fromNow()}`
  });
  console.log(">>>>>>>>>>>>");
}

run();
setInterval(function() {
  run();
}, FIFTEEN_MINS_MS);
