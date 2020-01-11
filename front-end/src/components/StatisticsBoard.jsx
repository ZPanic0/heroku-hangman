import React, { Component } from "react"
import LetterDisplay from "./LetterDisplay"
import WinLossDisplay from "./WinLossDisplay"
import LetterStatistics from '../utilities/LetterStatistics'
import WinLossStatistics from '../utilities/WinLossStatistics'
import { Dimmer, Segment, Loader } from "semantic-ui-react"

export default class StatisticsBoard extends Component {
    fetchLetterStatistics = new LetterStatistics().get
    fetchWinLossStatistics = new WinLossStatistics().get
    state = {
        letterStatistics: {},
        winLossStatistics: {},
        loaded: false
    }

    async componentDidMount() {
        this.setState({
            letterStatistics: await this.fetchLetterStatistics(),
            winLossStatistics: await this.fetchWinLossStatistics(),
            loaded: true
        })
    }

    render() {
        return <div>
            <Segment>
                <Dimmer inverted active={!this.state.loaded}>
                    <Loader>Loading</Loader>
                </Dimmer>

                <h3>Win/Loss Statistics</h3>
                <WinLossDisplay statistics={this.state.winLossStatistics} />
                <h3>Individual Letter Statistics</h3>
                <LetterDisplay statistics={this.state.letterStatistics} />
            </Segment>
        </div>
    }
}