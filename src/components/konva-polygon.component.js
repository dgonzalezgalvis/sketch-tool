import React from 'react';
import { Group, Line } from 'react-konva';

export class Polygon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'black'
        };
    }

    render() {
        return (
            <Group
            >
                <Line
                    points={this.props.points}
                    fill={this.state.color}
                    closed={true}
                />
            </Group>
        );
    }
}