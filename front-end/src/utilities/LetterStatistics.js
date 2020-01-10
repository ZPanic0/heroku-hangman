export default class LetterStatistics {
    async notify(letter) {
        return await fetch(`/LetterStatistics/update?letter=${letter}`)
    }

    async get() {
        const result = await fetch(`/LetterStatistics/get`)
        return await result.json()
    }
}