async function getWinLossStatistics(client, request, response) {
    const queryResult = await client.db(process.env.DB_NAME).collection('win-loss-statistics').findOne({})

    return response.send(JSON.stringify(queryResult))
}

module.exports = getWinLossStatistics