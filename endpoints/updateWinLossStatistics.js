async function updateWinLossStatistics(client, request, response) {
    if (request.query.won === undefined || !request.query.won.length) {
        return response.sendStatus(400)
    }
    const newValues = { $inc: {} }

    newValues.$inc[request.query.won === 'true' ? 'won' : 'lost'] = 1

    await client.db(process.env.DB_NAME).collection('win-loss-statistics').updateOne({}, newValues)

    return response.sendStatus(200)
}

module.exports = updateWinLossStatistics