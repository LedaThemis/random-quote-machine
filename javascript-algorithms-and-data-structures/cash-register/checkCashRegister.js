function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    let cashInDrawer = calculateCashInDrawer(cid);
    // if needed change is more than the money in drawer
    if (change > cashInDrawer) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    // if needed change equals money in drawer
    else if (change == cashInDrawer) {
      return {status: "CLOSED", change: cid};
    } 
    //
    else {
      return process_change(change, cid);
    }
  
    function calculateCashInDrawer(drawer) {
      let sum = 0;
      for (let i=0; i<drawer.length; i++) {
        sum += drawer[i][1];
      }
      return sum;
    }
  
      function process_change(chng, drawer) {
        let resultDrawer = [["PENNY", 0], ["NICKEL", 0], ["DIME", 0],
                      ["QUARTER", 0], ["ONE", 0], ["FIVE", 0],
                      ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
      let names = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"];
      let values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
      
      chng = chng.toFixed(2);
  
      for (let i=8; i>=0; i--) {
        let changeValue = values[i];
        if (chng >= changeValue && drawer[i][1] > 0) {
          if (drawer[i][1] > chng) {
            resultDrawer[i][1] = Math.floor(chng/changeValue)*changeValue;
          }
          else {
            resultDrawer[i][1] = Math.floor(chng/drawer[i][1])*drawer[i][1];
          }
          chng -= resultDrawer[i][1];
          chng = chng.toFixed(2); // fix float subtraction error
          
        }
      }
      let final = [];
      for (let i=8; i>=0; i--) {
        if (resultDrawer[i][1] > drawer[i][1]) {
          return {status: "INSUFFICIENT_FUNDS", change: []};
        }
        if (resultDrawer[i][1] != 0) {
          final.push([names[i], resultDrawer[i][1]]);
        }
      }
      return {status: "OPEN", change: final};
    }
      
  }
