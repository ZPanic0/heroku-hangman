import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import Player from './Player'

export default class GameMenu extends Component {
    render() {
        return <Menu tabular>
            <Menu.Item
                name='game'
                active={this.props.activeTab === 'game'}
                onClick={this.props.onTabClick}
            />
            <Menu.Item
                name='stats'
                active={this.props.activeTab === 'stats'}
                onClick={this.props.onTabClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Player
                        validCharacters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
                        playerName={this.props.playerName}
                        toggleGameKeyboard={this.props.toggleGameKeyboard}
                        updateName={this.props.updateName}
                    />
                </Menu.Item>
                <Menu.Item href="https://github.com/ZPanic0/heroku-hangman">
                    <Icon link name='github' size='large' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    }
}