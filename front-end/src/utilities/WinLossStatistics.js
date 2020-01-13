export default class WinLossStatistics {
    async notify(won, playerName) {
        const nameArgument = playerName && playerName !== 'guest' ? `&name=${playerName}` : ''

        return await fetch(`/WinLossStatistics/update?won=${won}${nameArgument}`)
    }

    async getGlobal() {
        const result = await fetch(`/WinLossStatistics/get`)
        return await result.json()
    }

    async getTop(count) {
        const result = await fetch(`/WinLossStatistics/get/top?count=${count}`)
        return await result.json()
    }

    async getPlayer(playerName) {
        const result = await fetch(`/WinLossStatistics/get/player?name=${playerName}`)

        return await result.json()
    }
}