const nameMappingBlock = (key, value) => {
  switch (key) {
    case "onStart":
      return {
        type: "event_whenflagclicked"
      };
    case "nextCostumes":
      return {
        type: "looks_nextcostume"
      };
    case "sleep":
      return {
        type: "control_wait",
        value: {
          name: "DURATION",
          shadow: {
            type: "math_positive_number",
            field: {
              "name": "NUM",
              "$t": value[0].value
            }
          }
        }
      };

    default:
      throw new Error("出现为定义的 ast node type")
  }
}

module.exports = {
  nameMappingBlock
}
