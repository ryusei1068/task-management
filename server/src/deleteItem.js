const db = require("../db/models/index")

function deleteItem(table, condition) {
  const result = db.sequelize.transaction(
      (t) => {return table.destroy({where : condition}, {transaction : t})})

  return result;
}

module.exports = deleteItem;
