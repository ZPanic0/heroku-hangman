export default (original, unmaskedCharacters) => {
    const regex = new RegExp(`[^${unmaskedCharacters.join('')} ]`, 'gi')
    
    return original.replace(regex, '_')
}