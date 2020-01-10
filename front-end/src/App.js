import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import GameBoard from './components/GameBoard'
import StatisticsBoard from './components/StatisticsBoard'
import LetterStatistics from './utilities/LetterStatistics'

export default class App extends Component {
  letterStatistics = new LetterStatistics()
  state = {
    activeTab: 'game',
    letterStatistics: {}
  }

  constructor(props) {
    super(props)

    this.setActiveTab = this.setActiveTab.bind(this)
  }

  async componentDidMount() {
    this.setState({ letterStatistics: await this.letterStatistics.get() })
  }

  async setActiveTab(event, element) {
    const nextState = { activeTab: element.name }

    if (element.name === 'stats') {
      nextState.letterStatistics = await this.letterStatistics.get()
    }

    this.setState(nextState)
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
        solution={this.props.solution}
      />
      <StatisticsBoard
        style={this.state.activeTab === 'stats'
          ? {}
          : disabledStyling}
        letterStatistics={this.state.letterStatistics}
      />
    </div>
  }
}
