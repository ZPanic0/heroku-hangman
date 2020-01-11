export default class WinLossStatistics {
    async notify(won) {
        return await fetch(`/WinLossStatistics/update?won=${won}`)
    }

    async get() {
        const result = await fetch(`/WinLossStatistics/get`)
        return await result.json()
    }
}