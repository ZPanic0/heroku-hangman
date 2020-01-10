import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import HangmanDisplay from './components/HangmanDisplay'
import WordProgress from './components/WordProgress'
import InputDashboard from './components/InputDashboard'
import GameOver from './components/GameOver'
import maskText from './utilities/maskText'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.onLetterClick = this.onLetterClick.bind(this)
    this.onResetClick = this.onResetClick.bind(this)
  }
  state = {
    guessedCharacters: [],
    wrongCount: 0,
    gameOver: false,
    playerWon: false
  }

  onLetterClick(letter) {
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
    this.setState({
      guessedCharacters: [],
      wrongCount: 0,
      gameOver: false
    })
  }

  render() {
    return <Grid>
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
            />
          </Grid.Column>
        </Grid.Row>}
    </Grid>
  }
}
