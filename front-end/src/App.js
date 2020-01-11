import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import GameBoard from './components/GameBoard'
import StatisticsBoard from './components/StatisticsBoard'
import LetterStatistics from './utilities/LetterStatistics'
import PuzzleInput from './utilities/PuzzleInput'
import WinLossStatistics from './utilities/WinLossStatistics'

export default class App extends Component {
  fetchLetterStatistics = new LetterStatistics()
  fetchPuzzleInput = new PuzzleInput()
  fetchWinLossStatistics = new WinLossStatistics()
  state = {
    activeTab: 'game',
    letterStatistics: {},
    winLossStatistics: {},
    solution: ''
  }

  constructor(props) {
    super(props)

    this.setActiveTab = this.setActiveTab.bind(this)
    this.onReset = this.onReset.bind(this)
  }

  async componentDidMount() {
    this.setState({
      letterStatistics: await this.fetchLetterStatistics.get(),
      winLossStatistics: await this.fetchWinLossStatistics.get(),
      solution: await this.fetchPuzzleInput.get()
    })
  }

  async setActiveTab(event, element) {
    const nextState = { activeTab: element.name }

    if (element.name === 'stats') {
      nextState.letterStatistics = await this.fetchLetterStatistics.get()
      nextState.letterStatistics = await this.fetchWinLossStatistics.get()
    }

    this.setState(nextState)
  }

  async onReset() {
    this.setState({ solution: await this.fetchPuzzleInput.get() })
  }

  render() {
    const disabledStyling = { display: 'none' }
    return <div>
      <Menu tabular>
        <Menu.Item
          name='game'
          active={this.state.activeTab === 'game'}
          onClick={this.setActiveTab}
        />
        <Menu.Item
          name='stats'
          active={this.state.activeTab === 'stats'}
          onClick={this.setActiveTab}
        />
        <Menu.Menu position='right'>
          <Menu.Item href="https://github.com/ZPanic0/heroku-hangman">
            <Icon link name='github' size='large' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <GameBoard
        style={this.state.activeTab === 'game'
          ? {}
          : disabledStyling}
        solution={this.state.solution}
        onReset={this.onReset}
      />
      <StatisticsBoard
        style={this.state.activeTab === 'stats'
          ? {}
          : disabledStyling}
        letterStatistics={this.state.letterStatistics}
        winLossStatistics={this.state.winLossStatistics}
      />
    </div>
  }
}
