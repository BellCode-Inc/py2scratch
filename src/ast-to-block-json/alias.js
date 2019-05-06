const alias = {
  nextCostumes:"looks_nextcostume",

  onStart: "event_whenflagclicked",

  sleep:"control_wait",
  delay:"control_wait",

  "+": "operator_add",
  "-": "operator_subtract",
  "*": "operator_multiply",
  "/": "operator_divide",
  ">":"operator_gt",
  "<":"operator_lt",
  "==":"operator_equals",
  "%":"operator_mod",
  abs:"operator_mathop",
  floor:"operator_mathop",
  ceiling:"operator_mathop",
  sqrt:"operator_mathop",
  sin:"operator_mathop",
  cos:"operator_mathop",
  tan:"operator_mathop",
  asin:"operator_mathop",
  acos:"operator_mathop",
  atan:"operator_mathop",
  in:"operator_mathop",
  log:"operator_mathop",

  forward:"motion_movesteps",
  right:"motion_turnright",
  left:"motion_turnleft",

  //subscriptIndex
  subscriptIndex:"data_itemoflist"

}
module.exports = {alias}
