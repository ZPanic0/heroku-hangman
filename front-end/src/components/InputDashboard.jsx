import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class InputDashboard extends Component {
    toButtons(input) {
        return input
            .split('')
            .map(letter => <Button
                key={`InputDashboard-${letter}`}
                value={letter}
                disabled={this.props.guessedCharacters.includes(letter) || this.props.disabled}
                className='guess-button'
                onClick={(e, { value }) => this.props.onLetterClick(value)}>
                {letter}
            </Button>)
    }

    render() {
        return <div className='input-dashboard'>
            <div>{this.toButtons('QWERTYUIOP')}</div>
            <div>{this.toButtons('ASDFGHJKL')}</div>
            <div>{this.toButtons('ZXCVBNM')}</div>
        </div>
    }

}