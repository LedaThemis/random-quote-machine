function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  change.toFixed(2); // https://stackoverflow.com/questions/6027937/javascript-float-subtract
  let cashInDrawer = calculateCashInDrawer(cid);
  // if needed change is more than the money in drawer
  if (change > cashInDrawer) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  // if needed change equals money in drawer
  else if (change == cashInDrawer) {
    return { status: "CLOSED", change: cid };
  } else {
    return process_change(change, cid);
  }

  function calculateCashInDrawer(drawer) {
    let sum = 0;
    for (let i = 0; i < drawer.length; i++) {
      sum += drawer[i][1];
    }
    return sum;
  }

  function process_change(chng, drawer) {
    let resultDrawer = [
      ["PENNY", 0],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0],
    ];
    let values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

    for (let i = 8; i >= 0; i--) {
      let changeValue = values[i];
      if (chng >= changeValue && drawer[i][1] > 0) {
        if (drawer[i][1] > chng) {
          resultDrawer[i][1] = Math.floor(chng / changeValue) * changeValue;
        } else {
          resultDrawer[i][1] = Math.floor(chng / drawer[i][1]) * drawer[i][1];
        }
        chng -= resultDrawer[i][1];
        chng = chng.toFixed(2); // https://stackoverflow.com/questions/6027937/javascript-float-subtract

        // checking if proposed change is valid (solves test 7)
        if (resultDrawer[i][1] > drawer[i][1]) {
          return { status: "INSUFFICIENT_FUNDS", change: [] };
        }
      }
    }
    // removing non-defined or zero-valued items
    // (using reverse to return items sorted)
    resultDrawer = resultDrawer.reverse().filter((e) => e[1] != 0);
    return { status: "OPEN", change: resultDrawer };
  }
}

// Tests
// TEST: 0
// console.log(checkCashRegister(19.6,20, [["PENNY", 1.1], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
// TEST: 1
// {status: "CLOSED", change: [["PENNY", 0.10]]}
// console.log(checkCashRegister(19.9,20, [["PENNY", 0.10], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// TEST: 2
// {status: "OPEN", change: cid}
// console.log(checkCashRegister(20, 20, [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// TEST: 3
//console.log(checkCashRegister(200,500, [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 300], ["ONE HUNDRED", 300]]))
// TEST: 4
// {status: "OPEN", change: [["QUARTER", 0.5]]}
// console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// TEST: 5
// {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15],
//                           ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2],
//                           ["PENNY", 0.04]]}
//console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// TEST: 6
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// TEST: 7
//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// TEST: 8
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// TEST: 9
//console.log(checkCashRegister(0.1, 0.4, [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
