import React, { Component } from "react";
import { Segment, Statistic, Grid } from "semantic-ui-react";

export default class WinLossDisplay extends Component {
    render() {
        return <Segment>
            <Grid textAlign='center' columns={2}>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Statistic size='large'>
                            <Statistic.Value>{this.props.statistics.won}</Statistic.Value>
                            <Statistic.Label>Games Won (Globally)</Statistic.Label>
                        </Statistic>

                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Statistic size='large'>
                            <Statistic.Value>{this.props.statistics.lost}</Statistic.Value>
                            <Statistic.Label>Games Lost (Globally)</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    }
}