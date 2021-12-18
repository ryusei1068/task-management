const db = require("../db/models/index")

function insertItem(table, targetColumn) {
  const result = db.sequelize.transaction((t) => {
    return table.create(
      targetColumn,
      { transaction: t })
  })

  return result;
}

module.exports = insertItem;
