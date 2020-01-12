async function updateWinLossStatistics(client, request, response) {
    if (!request.query || !request.query.won || !request.query.won.length) {
        return response.sendStatus(400)
    }
    const newValues = { $inc: {} }

    newValues.$inc[request.query.won === 'true' ? 'won' : 'lost'] = 1

    await client
        .db(process.env.DB_NAME)
        .collection('win-loss-statistics')
        .updateOne({ name: { $exists: false } }, newValues)

    if (request.query.name && request.query.name.length) {
        await client
            .db(process.env.DB_NAME)
            .collection('win-loss-statistics')
            .updateOne({ name: request.query.name }, newValues, { upsert: true })
    }

    return response.sendStatus(200)
}

module.exports = updateWinLossStatistics