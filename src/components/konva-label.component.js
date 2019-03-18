import React from 'react';
import { Group, Text } from 'react-konva';

export class Label extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'red',
            ...this.state,
            x: this.props.x,
            y: this.props.y,
            text: this.props.text
        };
    }

    updatePosition = (x, y) => {
        this.setState({
            ...this.state,
            x,
            y,
        });
    }

    render() {
        return (
            <Group
            >
                <Text
                    x={this.state.x}
                    y={this.state.y}
                    text= {this.props.text}
                    fontSize= {28}
                >
                </Text>
            </Group>
        );
    }
}