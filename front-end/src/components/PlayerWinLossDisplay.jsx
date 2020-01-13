import React, { Component } from "react";
import { Segment, Dimmer, Loader, Grid, Statistic, Header } from "semantic-ui-react";
import WinLossStatistics from '../utilities/WinLossStatistics'

export default class PlayerWinLossDisplay extends Component {
    getStatistics = new WinLossStatistics().getPlayer
    state = {
        won: 0,
        lost: 0,
        loading: true,
        notFound: false
    }

    async componentDidMount() {
        if (this.props.isGuest) return

        const nextState = await this.getStatistics(this.props.playerName) || { won: '?', lost: '?', notFound: true }
        nextState.loading = false

        this.setState(nextState)
    }

    render() {
        return <Segment>
            <Dimmer inverted active={this.state.loading || this.props.isGuest || this.state.notFound}>
                {this.props.isGuest &&
                    <Header inverted as='h2' style={{ color: 'black' }}>Enter a name above to see your data!</Header>}
                {this.state.loading && !this.props.isGuest &&
                    <Loader>Loading</Loader>}
                {this.state.notFound && <div>
                    <Header inverted as='h2' style={{ color: 'black' }}>Could not find player data!</Header>
                    <Header inverted as='h2' style={{ color: 'black' }}>This should resolve itself if you play a few games.</Header>
                </div>}
            </Dimmer>

            <Grid textAlign='center' columns={2}>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Statistic size='large'>
                            <Statistic.Value>{this.state.won}</Statistic.Value>
                            <Statistic.Label>Games Won (You)</Statistic.Label>
                        </Statistic>

                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Statistic size='large'>
                            <Statistic.Value>{this.state.lost}</Statistic.Value>
                            <Statistic.Label>Games Lost (You)</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    }
}