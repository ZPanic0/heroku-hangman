async function getLetterStatistics(client, request, response) {
    const queryResult = await client
        .db(process.env.DB_NAME)
        .collection('letter-guess-statistics')
        .findOne({})

    return response.json(queryResult)
}

module.exports = getLetterStatistics