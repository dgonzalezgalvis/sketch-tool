class ColoredRect extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        color: 'green',
        ...this.state,
        x: this.props.x,
        y: this.props.y
      };
    }
  
    handleClick = () => {
      console.log('click');
      this.setState({
        color: Konva.Util.getRandomColor(),
      });
    }
  
    handleDragBound = (pos) => {
      const newY = pos.y < 10 ? 10 : (pos.y > window.innerHeight - 20 ? window.innerHeight - 20 : pos.y);
      const newX = pos.x < 0 ? 10 : (pos.x > window.innerWidth - 20 ? window.innerWidth - 20 : pos.x);
      const newPos = {
        x: newX,
        y: newY,
      };
  
      return newPos;
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
          <Rect
            x={this.state.x}
            y={this.state.y}
            width={this.props.width}
            height={this.props.height}
            fill={this.state.color}
            shadowBlur={5}
            draggable={true}
            onClick={this.handleClick}
            dragBoundFunc={this.handleDragBound}
            onDragEnd={e => this.props.onDragEnd(e, this)}
          />
        </Group>
      );
    }
  }