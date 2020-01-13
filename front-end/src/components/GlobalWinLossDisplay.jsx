import React, { Component } from "react"
import { Segment, Statistic, Grid, Dimmer, Loader } from "semantic-ui-react"
import WinLossStatistics from '../utilities/WinLossStatistics'

export default class GlobalWinLossDisplay extends Component {
    getStatistics = new WinLossStatistics().getGlobal
    state = {
        won: 0,
        lost: 0,
        loading: true
    }

    async componentDidMount() {
        const nextState = await this.getStatistics()
        nextState.loading = false

        this.setState(nextState)
    }

    render() {
        return <Segment>
            <Dimmer inverted active={this.state.loading}>
                <Loader>Loading</Loader>
            </Dimmer>

            <Grid textAlign='center' columns={2}>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Statistic size='large'>
                            <Statistic.Value>{this.state.won}</Statistic.Value>
                            <Statistic.Label>Games Won (Globally)</Statistic.Label>
                        </Statistic>

                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Statistic size='large'>
                            <Statistic.Value>{this.state.lost}</Statistic.Value>
                            <Statistic.Label>Games Lost (Globally)</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    }
}