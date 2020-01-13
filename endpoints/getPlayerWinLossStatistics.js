async function getPlayerWinLossStatistics(client, request, response) {
    if (!request.query || !request.query.name || !request.query.name.length) response.sendStatus(400)

    const queryResult = await client
        .db(process.env.DB_NAME)
        .collection('win-loss-statistics')
        .findOne({ name: request.query.name })

    response.json(queryResult)
}

module.exports = getPlayerWinLossStatistics