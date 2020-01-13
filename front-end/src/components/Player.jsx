import React, { Component } from "react";
import { Label, Icon, Input } from 'semantic-ui-react'

export default class Player extends Component {
    nameInput = undefined
    state = {
        textEntryActive: false,
        enteredText: ''
    }

    constructor(props) {
        super(props)

        this.onNameClick = this.onNameClick.bind(this)
        this.onNameUpdate = this.onNameUpdate.bind(this)
    }

    onNameClick() {
        this.props.toggleGameKeyboard(false)

        this.setState({
            textEntryActive: true,
            enteredText: ''
        }, () => this.nameInput.focus())
    }

    onNameUpdate({ key }) {
        if (this.props.validCharacters.includes(key)) {
            this.setState(prevState => {
                return { enteredText: prevState.enteredText + key }
            })
            return
        }

        if (key === 'Backspace') {
            this.setState(prevState => {
                if (prevState.enteredText.length > 0) {
                    console.log(prevState)
                    return { enteredText: prevState.enteredText.substring(0, prevState.enteredText.length - 1) }
                }
            })
            return
        }

        if (key === 'Enter') {
            this.props.updateName(this.state.enteredText)

            this.setState({
                textEntryActive: false,
                enteredText: ''
            })

            this.props.toggleGameKeyboard(true)
            return
        }

        if (key === 'Escape') {
            this.setState({
                textEntryActive: false,
                enteredText: ''
            })

            this.props.toggleGameKeyboard(true)
            return
        }
    }

    render() {
        return <div className='player-name'>
            <Label
                onClick={this.state.textEntryActive ? null : this.onNameClick}
                title={this.state.textEntryActive ? null : `Playing as '${this.props.playerName}'. Click to change.`}
            >
                <Icon name='user' />
                {this.state.textEntryActive
                    ? <Input
                        ref={inputRef => this.nameInput = inputRef}
                        onKeyDown={this.onNameUpdate}
                        placeholder={this.props.playerName}
                    />
                    : this.props.playerName}
            </Label>
        </div>
    }
}