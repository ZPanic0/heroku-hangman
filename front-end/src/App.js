import React, { Component } from 'react'
import GameBoard from './components/GameBoard'
import StatisticsBoard from './components/StatisticsBoard'
import PuzzleInput from './utilities/PuzzleInput'
import GameMenu from './components/GameMenu'

export default class App extends Component {
  fetchPuzzleInput = new PuzzleInput()
  hasLocalStorage = localStorage && localStorage.getItem && localStorage.setItem
  state = {
    activeTab: 'game',
    letterStatistics: {},
    winLossStatistics: {},
    solution: '',
    playerName: 'guest',
    gameBoardLocks: 0
  }

  constructor(props) {
    super(props)

    this.checkStorage()

    this.setActiveTab = this.setActiveTab.bind(this)
    this.onReset = this.onReset.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateGameBoardLocks = this.updateGameBoardLocks.bind(this)
  }

  checkStorage() {
    if (this.hasLocalStorage) {
      const storage = localStorage.getItem('heroku-hangman')

      if (storage) {
        Object.assign(this.state, JSON.parse(storage))
      }
    }
  }

  async componentDidMount() {
    this.setState({
      solution: await this.fetchPuzzleInput.get()
    })
  }

  async setActiveTab(event, { name }) {
    this.setState({ activeTab: name })
  }

  async onReset() {
    this.setState({ solution: await this.fetchPuzzleInput.get() })
  }

  updateName(newName) {
    if (this.hasLocalStorage) {
      localStorage.setItem('heroku-hangman', JSON.stringify({ playerName: newName }))
    }

    this.setState({ playerName: newName })
  }

  updateGameBoardLocks(enabled) {
    this.setState(prevState => {
      return { gameBoardLocks: prevState.gameBoardLocks + (enabled ? -1 : 1) }
    })
  }

  render() {
    return <div>
      <GameMenu
        activeTab={this.state.activeTab}
        playerName={this.state.playerName}
        onTabClick={this.setActiveTab}
        updateName={this.updateName}
        toggleGameKeyboard={this.updateGameBoardLocks}
      />
      <GameBoard
        style={this.state.activeTab === 'game'
          ? {}
          : { display: 'none' }}
        solution={this.state.solution}
        playerName={this.state.playerName}
        onReset={this.onReset}
        gameBoardEnabled={!this.state.gameBoardLocks}
      />
      {this.state.activeTab === 'stats' &&
        <StatisticsBoard playerName={this.state.playerName} />}
    </div>
  }
}
