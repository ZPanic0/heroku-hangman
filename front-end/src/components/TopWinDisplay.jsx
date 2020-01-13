import React, { Component } from "react"
import { Table, Segment, Dimmer, Loader } from 'semantic-ui-react'
import WinLossStatistics from "../utilities/WinLossStatistics"

export default class TopWinDisplay extends Component {
    getStatistics = new WinLossStatistics().getTop
    state = {
        statistics: [],
        loading: true
    }

    constructor(props) {
        super(props)

        this.buildRows = this.buildRows.bind(this)
    }

    async componentDidMount() {
        this.setState({
            statistics: await this.getStatistics(this.props.count),
            loading: false
        })
    }

    buildRows() {
        const rows = []

        for (let i = 0; i < this.state.statistics.length; i++) {
            const thisRowData = this.state.statistics[i]

            rows.push(<Table.Row key={thisRowData.name}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{thisRowData.name}</Table.Cell>
                <Table.Cell>{thisRowData.won || 0}</Table.Cell>
            </Table.Row>)
        }

        return rows
    }

    render() {
        console.log(this.state.statistics)
        return <Segment>
            <Dimmer inverted active={this.state.loading}>
                <Loader>Loading</Loader>
            </Dimmer>

            {!this.state.loading &&
                <Table compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Rank</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Wins</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.buildRows()}
                    </Table.Body>
                </Table>}
        </Segment>
    }
}