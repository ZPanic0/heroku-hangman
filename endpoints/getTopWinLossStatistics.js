async function getTopWinLossStatistics(client, request, response) {
    const queryResult = await client
        .db(process.env.DB_NAME)
        .collection('win-loss-statistics')
        .find({ name: { $exists: true } })
        .sort({ won: -1 })
        .limit(10)
        .project({name: 1, won: 1})
        .toArray()

    response.json(queryResult)
}

module.exports = getTopWinLossStatistics