import React from 'react';
import { render } from 'react-dom';
import * as R from 'ramda';
import Konva from 'konva';
import { Layer, Rect, Stage, Group, Circle, Line } from 'react-konva';

import logo from './logo.svg';
import './App.css';

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

class Point extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'black',
      ...this.state,
      x: this.props.x,
      y: this.props.y,
    };
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
          draggable={false}
          onClick={this.props.click}
        />
      </Group>
    );
  }
}

class Polygon extends React.Component {
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      drawingMode: false,
      mouse: {
        startDraw: false,
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
      },
    }
  }

  handleShapeDragEnd = (e, inst) => {
    console.log(inst);
    inst.updatePosition(
      e.evt.dragEndNode.attrs.x,
      e.evt.dragEndNode.attrs.y
    );
  }

  handleClick = (e) => {
    const { mouse } = this.state;
    if (!mouse.startDraw) {
      this.setState({
        mouse: {
          startDraw: true
        },
      })
      return;
    }


    this.setState({
      drawing: true,
      mouse: {
        ...this.state.mouse,
        x: mouse.x,
        y: mouse.y
      },
    })

    let drawingPoint = <Point
      x={mouse.x}
      y={mouse.y}
      width={1}
      height={1}
      stroke={'black'}
      key={this.state.children.length}
      name={`shape${this.state.children.length}`}
      draggable={false}
      click={this.finishPolygon}
    />

    const { children } = this.state;
    const newChildren = R.clone(children);
    newChildren.push(drawingPoint);

    this.setState({
      children: newChildren,
      mouse: {
        ...this.state.mouse,
        startX: 0,
        startY: 0
      }
    });

    /*if (!this.state.mouse.startDraw) {
      document.body.style.cursor = 'crosshair';
      const { mouse } = this.state;

      this.setState({
        drawing: true,
        mouse: {
          ...this.state.mouse,
          startDraw: true,
          startX: mouse.x,
          startY: mouse.y
        },
      })
     
    } else {
      document.body.style.cursor = 'default';

      const { mouse } = this.state;
      const newWidth = Math.abs(e.evt.layerX - mouse.startX);
      const newHeight = Math.abs(e.evt.layerY - mouse.startY);
      const startX = (mouse.x - mouse.startX) < 0 ? mouse.x : mouse.startX;
      const startY = (mouse.y - mouse.startY) < 0 ? mouse.y : mouse.startY;
      
      let drawingShape = <ColoredRect
        x={startX}
        y={startY}
        width={newWidth}
        height={newHeight}
        stroke={'black'}
        key={this.state.children.length}
        name={`shape${this.state.children.length}`}
        draggable={true}
        // onDragStart={this.handleShapeDragStart}
        onDragEnd={this.handleShapeDragEnd}
      />

      const { children } = this.state;
      const newChildren = R.clone(children);
      newChildren.push(drawingShape);

      this.setState({
        children: newChildren,
        mouse: {
          ...this.state.mouse,
          startDraw: false,
          startX: 0,
          startY: 0         
        }
      });
    }*/

  }

  handleMouseMove = (e) => {
    if (this.state.drawingMode) {
      // get cursor current position
      this.setState({
        mouse: {
          ...this.state.mouse,
          x: e.evt.layerX,
          y: e.evt.layerY,
        }
      });
    }
  }

  finishPolygon = (e) => {
    // alert('hello');
    console.log(this.state);
    let dots = [];
    this.state.children.forEach((dot) => {
      console.log(dot);
      // alert(dot.props.x + '*' +dot.props.y);
      dots.push(dot.props.x);
      dots.push(dot.props.y);
    })
    let polygon = <Polygon
      points={dots}
    />;
    this.state.children = [];
    const { children } = this.state;
    const newChildren = R.clone(children);
    newChildren.push(polygon);

    this.setState({
      children: newChildren,
      mouse: {
        ...this.state.mouse,
        startDraw: false,
        startX: 0,
        startY: 0
      }
    });
  }



  handleStartDrawClick = (e) => {
    this.setState({
      drawingMode: true
    });
  }

  handleStopDrawClick = (e) => {
    this.setState({
      drawingMode: false
    });
  }

  render() {
    return (
      <div>
        <input type='button' value='start draw' onClick={this.handleStartDrawClick} />
        <input type='button' value='stop draw' onClick={this.handleStopDrawClick} />
        {window.innerWidth} - {window.innerHeight}
        <Stage width={window.innerWidth} height={window.innerHeight}
          onContentClick={this.handleClick}
          onContentMouseMove={this.handleMouseMove}
        >
          <Layer ref='layer'>
            {this.state.children}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
