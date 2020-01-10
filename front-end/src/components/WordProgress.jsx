import React, { Component } from 'react'
import maskText from '../utilities/maskText'

export default class WordProgress extends Component {
    render() {
        return <div className='word-progress'>
            {maskText(this.props.solution, this.props.guessedCharacters)}
        </div>
    }
}