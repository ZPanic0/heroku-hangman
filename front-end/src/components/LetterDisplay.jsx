import React, { Component } from "react";
import { Statistic, Segment, Grid } from 'semantic-ui-react'

export default class LetterDisplay extends Component {
    render() {
        const rows = []
        let sum = 0;

        for (const [key, val] of Object.entries(this.props.statistics)) {
            if (!'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(key)) continue

            rows.push(<Statistic key={key}>
                <Statistic.Value>{val}</Statistic.Value>
                <Statistic.Label>{key}</Statistic.Label>
            </Statistic>)

            sum += val
        }

        return <Segment raised>
            <Grid>
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
        </Segment>
    }
}