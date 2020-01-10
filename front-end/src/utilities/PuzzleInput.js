export default class PuzzleInput {
    async get() {
        const result = await fetch('/PuzzleInput/get')
        
        return await result.text()
    }
}