import React from 'react';
import { Group, Circle } from 'react-konva';

export class Point extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'red',
            ...this.state,
            x: this.props.x,
            y: this.props.y,
            index: this.props.index
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
                <Circle
                    x={this.state.x}
                    y={this.state.y}
                    radius={5}
                    fill={this.state.color}
                    shadowBlur={5}
                    draggable={true}
                    onClick={this.props.click}
                    onDragEnd={e => this.props.dragend(e, this)}
                />
            </Group>
        );
    }
}