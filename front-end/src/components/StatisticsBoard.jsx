import React, { Component } from "react"
import LetterDisplay from "./LetterDisplay"


export default class StatisticsBoard extends Component {
    render() {
        return <div style={this.props.style}>
            <h3>Individual Letter Statistics</h3>
            <LetterDisplay statistics={this.props.letterStatistics} />
        </div>
    }
}