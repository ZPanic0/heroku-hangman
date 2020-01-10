import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import HangmanDisplay from './HangmanDisplay'
import WordProgress from './WordProgress'
import InputDashboard from './InputDashboard'
import GameOver from './GameOver'
import maskText from '../utilities/maskText'
import LetterStatistics from '../utilities/LetterStatistics'

export default class App extends Component {
  letterStatistics = new LetterStatistics()
  state = {
    guessedCharacters: [],
    wrongCount: 0,
    gameOver: false,
    playerWon: false
  }

  constructor(props) {
    super(props)

    this.onLetterClick = this.onLetterClick.bind(this)
    this.onResetClick = this.onResetClick.bind(this)
  }

  onLetterClick(letter) {
    this.letterStatistics.notify(letter)

    this.setState(prevState => {
      const nextState = {
        guessedCharacters: [...prevState.guessedCharacters, letter]
      }

      nextState.playerWon = this.props.solution === maskText(this.props.solution, nextState.guessedCharacters)

      if (!this.props.solution.includes(letter)) {
        nextState.wrongCount = prevState.wrongCount + 1

        nextState.gameOver = nextState.wrongCount === 6
      }

      return nextState
    })
  }

  onResetClick() {
    this.props.onReset()
    this.setState({
      guessedCharacters: [],
      wrongCount: 0,
      gameOver: false
    })
  }

  render() {
    return <Grid style={this.props.style}>
      <Grid.Row>
        <Grid.Column width={13}>
          <WordProgress
            guessedCharacters={this.state.guessedCharacters}
            solution={this.props.solution} />
        </Grid.Column>
        <Grid.Column width={3}>
          <HangmanDisplay index={this.state.wrongCount} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <InputDashboard
            disabled={this.state.gameOver || this.state.playerWon}
            guessedCharacters={this.state.guessedCharacters}
            onLetterClick={this.onLetterClick}
          />
        </Grid.Column>
      </Grid.Row>
      {(this.state.gameOver || this.state.playerWon) &&
        <Grid.Row>
          <Grid.Column width={16}>
            <GameOver
              playerWon={this.state.playerWon}
              onResetClick={this.onResetClick}
              solution={this.props.solution}
            />
          </Grid.Column>
        </Grid.Row>}
    </Grid>
  }
}
