async function updateLetterStatistics(client, request, response) {
    if (!request.query.letter ||
        request.query.letter.length !== 1 ||
        !'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(request.query.letter)) {
        return response.sendStatus(400)
    }

    const newValues = { $inc: {} }
    newValues.$inc[request.query.letter] = 1

    await client
        .db(process.env.DB_NAME)
        .collection('letter-guess-statistics')
        .updateOne({}, newValues)

    return response.sendStatus(200)
}

module.exports = updateLetterStatistics