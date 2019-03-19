import React from 'react';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import { Layer, Stage, Group } from 'react-konva';

configure({ adapter: new Adapter() });

describe('App component shallow testing', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Layer).length).toEqual(1);
  });

  it('renders welcome message', function() {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Stage).length).toEqual(1);
  });
});

describe('App component function testing', function() {
  it('createPoint method', function() {
    const app = new App();
    const mouse = {x:50, y:50};
    const point = app.createPoint(mouse);
    expect(point.x).toEqual(50);
    expect(point.y).toEqual(50);
  });

  it('createKonvaPoint method', function() {
    const app = new App();
    const mouse = {x:50, y:50};
    const point = shallow(app.createKonvaPoint(mouse));
    expect(point.find(Group).length).toEqual(1);
  });

  it('createKonvaLabel method', function() {
    const app = new App();
    const mouse = {x:50, y:50};
    const point = shallow(app.createKonvaLabel(mouse));
    expect(point.find(Group).length).toEqual(1);
  });
});

describe('App component properties testing', function() {
  it('Dots index property', function() {
    const app = new App();
    expect(app.dotsIndex).toEqual(0);
  });

  it('Div style property', function() {
    const app = new App();
    expect(app.divStyle.borderStyle).toEqual('1px solid black');
    expect(app.divStyle.backgroundColor).toEqual('lightgray');
  });
});