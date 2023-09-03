import React from "react";
import Transaction from "./transaction";

function Withdraw() {
  return <Transaction color="danger" transactionType="withdraw" />;
}

export default Withdraw;
