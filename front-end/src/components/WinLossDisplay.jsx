import React, { Component } from "react";
import GlobalWinLossDisplay from "./GlobalWinLossDisplay";
import PlayerWinLossDisplay from "./PlayerWinLossDisplay";
import TopWinDisplay from "./TopWinDisplay";

export default class WinLossDisplay extends Component {
    render() {
        return <div>
            <GlobalWinLossDisplay />
            <PlayerWinLossDisplay
                key={this.props.playerName}
                isGuest={this.props.playerName === 'guest'}
                playerName={this.props.playerName}
            />
            <TopWinDisplay count={10} />
        </div>
    }
}