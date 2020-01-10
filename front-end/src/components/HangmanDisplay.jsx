import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'

export default class HangmanDisplay extends Component {
    resolveImage(index) {
        if (index > 6 || index < 0) throw new Error("Could not resolve image index in 'HangmanDisplay'.")
        
        return `./img/Hangman-${index}.png`
    }

    render() {
        return <Image src={this.resolveImage(this.props.index)} />
    }
}