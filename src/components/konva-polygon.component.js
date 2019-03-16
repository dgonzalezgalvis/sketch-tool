import React from 'react';
import { Group, Line } from 'react-konva';
import Konva from 'konva';

export class Polygon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'black'
        };
    }

    handleClick = () => {   
        this.setState({
          color: Konva.Util.getRandomColor(),
        });
      }

    render() {
        return (
            <Group
            >
                <Line
                    points={this.props.points}
                    fill={this.state.color}
                    closed={true}
                    onClick={this.handleClick}
                />
            </Group>
        );
    }
}