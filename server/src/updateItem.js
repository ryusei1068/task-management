const db = require("../db/models/index")

function updateItem(table, targetColumn, condition) {
    const result = db.sequelize.transaction((t) => {
        return table.update(
            targetColumn,
        {
            where: condition
        },
        { transaction: t })
    })

    return result;
}

module.exports = updateItem;
