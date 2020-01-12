export default class WinLossStatistics {
    async notify(won, playerName) {
        const nameArgument = playerName && playerName !== 'guest' ? `&name=${playerName}` : ''

        return await fetch(`/WinLossStatistics/update?won=${won}${nameArgument}`)
    }

    async get() {
        const result = await fetch(`/WinLossStatistics/get`)
        return await result.json()
    }
}