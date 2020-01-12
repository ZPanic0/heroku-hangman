import React, { Component } from 'react'
import GameBoard from './components/GameBoard'
import StatisticsBoard from './components/StatisticsBoard'
import PuzzleInput from './utilities/PuzzleInput'
import GameMenu from './components/GameMenu'

export default class App extends Component {
  fetchPuzzleInput = new PuzzleInput()
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

    this.setActiveTab = this.setActiveTab.bind(this)
    this.onReset = this.onReset.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateGameBoardLocks = this.updateGameBoardLocks.bind(this)
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
        onReset={this.onReset}
        gameBoardEnabled={!this.state.gameBoardLocks}
      />
      {this.state.activeTab === 'stats' &&
        <StatisticsBoard />}
    </div>
  }
}
