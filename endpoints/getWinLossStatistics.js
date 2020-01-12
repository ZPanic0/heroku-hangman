async function getWinLossStatistics(client, request, response) {
    const queryResult = await client
        .db(process.env.DB_NAME)
        .collection('win-loss-statistics')
        .findOne({ name: { $exists: false } })

    return response.json(queryResult)
}

module.exports = getWinLossStatistics