import React, { Component } from "react"
import { Table } from 'semantic-ui-react'

export default class StatisticsBoard extends Component {

    toTableRows(statistics) {
        const rows = []

        for (const [key, val] of Object.entries(statistics)) {
            if (!'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(key)) {continue}

            rows.push(
                <Table.Row key={key}>
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{val}</Table.Cell>
                </Table.Row>
            )
        }

        return rows
    }

    render() {
        return <Table celled style={this.props.style}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Letter</Table.HeaderCell>
                    <Table.HeaderCell>Times Guessed (Globally)</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {this.toTableRows(this.props.letterStatistics)}
            </Table.Body>
        </Table>
    }
}