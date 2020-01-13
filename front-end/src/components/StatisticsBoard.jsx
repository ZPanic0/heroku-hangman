import React, { Component } from "react"
import LetterDisplay from "./LetterDisplay"
import WinLossDisplay from "./WinLossDisplay"
import LetterStatistics from '../utilities/LetterStatistics'

export default class StatisticsBoard extends Component {
    fetchLetterStatistics = new LetterStatistics().get
    state = {
        letterStatistics: {},
        loaded: false
    }

    async componentDidMount() {
        this.setState({
            letterStatistics: await this.fetchLetterStatistics(),
            loaded: true
        })
    }

    render() {
        return <div>
            <h3>Win/Loss Statistics</h3>
            <WinLossDisplay
                globalWinLossStatistics={this.state.globalWinLossStatistics}
                playerWinLossStatistics={this.state.playerWinLossStatistics}
                playerName={this.props.playerName}
            />
            <h3>Individual Letter Statistics</h3>
            <LetterDisplay statistics={this.state.letterStatistics} />
        </div>
    }
}