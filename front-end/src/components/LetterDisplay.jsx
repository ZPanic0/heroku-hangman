import React, { Component } from "react";
import { Statistic, Segment, Grid, Dimmer, Loader } from 'semantic-ui-react'
import LetterStatistics from '../utilities/LetterStatistics'

export default class LetterDisplay extends Component {
    getStatistics = new LetterStatistics().get
    state = {
        statistics: {},
        loading: true
    }
    constructor(props) {
        super(props)

        this.buildGrid = this.buildGrid.bind(this)
    }

    async componentDidMount() {
        this.setState({
            statistics: await this.getStatistics(),
            loading: false
        })
    }

    buildGrid() {
        const rows = []
        let sum = 0;

        for (const [key, val] of Object.entries(this.state.statistics)) {
            if (!'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(key)) continue

            rows.push(<Statistic key={key}>
                <Statistic.Value>{val}</Statistic.Value>
                <Statistic.Label>{key}</Statistic.Label>
            </Statistic>)

            sum += val
        }

        return <Grid>
            <Grid.Row verticalAlign='middle'>
                <Grid.Column width={2}>
                    <Statistic.Group size='small'>
                        <Statistic>
                            <Statistic.Value>{sum}</Statistic.Value>
                            <Statistic.Label>Total</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Grid.Column>
                <Grid.Column width={14}>
                    <Statistic.Group widths='9' size='small'>
                        {rows}
                    </Statistic.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    }

    render() {
        return <Segment>
            <Dimmer inverted active={this.state.loading}>
                <Loader>Loading</Loader>
            </Dimmer>

            {this.buildGrid()}
        </Segment >
    }
}