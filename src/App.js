import React from 'react';
// import { render } from 'react-dom';
import * as R from 'ramda';
// import Konva from 'konva';
// import { Layer, Rect, Stage, Group, Circle, Line } from 'react-konva';
import { Layer, Stage } from 'react-konva';

import { Point } from './components/konva-point.component';
import { Label } from './components/konva-label.component';
import { Polygon } from './components/konva-polygon.component';
import { AngleCalculator } from './services/angle-calculator.service';
import './App.css';

class App extends React.Component {
  dotsIndex = 0;
  angleCalculator = new AngleCalculator();
  divStyle = {
    borderStyle: '1px solid black',
    backgroundColor: 'lightgray'
  };
  
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      drawingMode: true,
      mouse: {
        startDraw: false,
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
      },
      points: [],
      polygon: {}
    }
  }

  handleShapeDragEnd = (e, inst) => {
    // console.log(inst);
    const { points } = this.state;
    // debugger
    points.forEach((dot) => {
      if (inst.props.index === dot.index) {
        dot.x = e.evt.dragEndNode.attrs.x;
        dot.y = e.evt.dragEndNode.attrs.y;
      }
    })
    this.finishPolygon();
  }

  handleClick = (e) => {
    const { drawingMode } = this.state;
    if (!drawingMode) return;

    const { mouse } = this.state;

    this.setState({
      drawing: true,
      mouse: {
        ...this.state.mouse,
        x: mouse.x,
        y: mouse.y
      },
    });

    let point = this.createPoint(mouse);

    let drawingPoint = this.createKonvaPoint(point);

    const { children } = this.state;
    const newChildren = R.clone(children);
    newChildren.push(drawingPoint);

    const { points } = this.state;
    const newPoints = R.clone(points);
    newPoints.push(point);

    this.setState({
      children: newChildren,
      points: newPoints,
      mouse: {
        ...this.state.mouse,
        startX: 0,
        startY: 0
      }
    });

    this.dotsIndex++;

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

  createPoint(mouse) {
    return {
      x: mouse.x,
      y: mouse.y,
      index: R.clone(this.dotsIndex)
    }
  }

  createKonvaPoint(point) {
    return <Point
      x={point.x}
      y={point.y}
      index={point.index}
      width={1}
      height={1}
      stroke={'black'}
      key={point.index}
      name={`shape${this.state.children.length}`}
      draggable={true}
      click={this.finishPolygon}
      dragend={this.handleShapeDragEnd}
    />
  }

  createKonvaLabel(angle) {
    return <Label
      x={angle.x}
      y={angle.y}
      text={angle.angle}
    />
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
    let angles = [];
    let dots = [];
    let konvaDots = [];
    this.dotsIndex = 0;
    console.log(this.state.points);
    this.state.points.forEach((point) => {
      konvaDots.push(this.createKonvaPoint(point));
      dots.push(point.x);
      dots.push(point.y);
      let pointBefore, pointAfter;
      if (this.dotsIndex === 0) {
        pointBefore = this.state.points[this.state.points.length - 1];
        pointAfter = this.state.points[this.dotsIndex + 1];
      } else if (this.dotsIndex === (this.state.points.length - 1)) {
        pointBefore = this.state.points[this.dotsIndex - 1];
        pointAfter = this.state.points[0];
      } else {
        pointBefore = this.state.points[this.dotsIndex - 1];
        pointAfter = this.state.points[this.dotsIndex + 1];
      }
      // console.log(pointBefore, point, pointAfter);
      angles.push(this.createKonvaLabel({
        angle: this.angleCalculator.findAngleDegrees(pointBefore, point, pointAfter),
        x: point.x,
        y: point.y
      }));

      this.dotsIndex++;
    });
    console.log('dots', dots);
    console.log('angles', angles);
    let polygon = <Polygon
      points={dots}
    // onDragStart={this.handleShapeDragStart}
    // onDragEnd={this.handleShapeDragEnd}
    />;
    // this.state.children = [];
    // const { children } = this.state;
    const newChildren = R.clone(konvaDots);
    newChildren.push(...angles);
    newChildren.push(polygon);

    this.setState({
      children: newChildren,
      drawingMode: false,
      mouse: {
        ...this.state.mouse,
        startDraw: false,
        startX: 0,
        startY: 0
      },
      polygon
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
        {/* <input type='button' value='start draw' onClick={this.handleStartDrawClick} />
        <input type='button' value='stop draw' onClick={this.handleStopDrawClick} /> */}
        <h1>Canvas</h1>
        <p>Click to draw a point anywhere; click again in any existing point to create a polygon</p>
        <p>Canvas size:</p>{window.innerWidth} - {window.innerHeight}
        <div style={this.divStyle}>
          <Stage width={window.innerWidth} height={window.innerHeight}
            onContentClick={this.handleClick}
            onContentMouseMove={this.handleMouseMove}
          >
            <Layer ref='layer'>
              {this.state.children}
            </Layer>
          </Stage>
        </div>

      </div>
    );
  }
}

export default App;
