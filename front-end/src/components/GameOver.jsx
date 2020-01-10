import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class GameOver extends Component {
    render() {
        return <div className='game-over'>
            <span>{this.props.playerWon ? 'YOU WIN! ' : 'GAME OVER!'}</span>
            <Button onClick={this.props.onResetClick}>Play Again?</Button>
        </div>
    }
}