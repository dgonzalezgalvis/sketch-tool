import React from 'react';
import { Point } from './konva-point.component';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import { Group, Circle } from 'react-konva';

configure({ adapter: new Adapter() });

describe('Point component testing', function () {
    it('renders Group element', function () {
        const wrapper = shallow(<Point />);
        expect(wrapper.find(Group).length).toEqual(1);
    });

    it('renders Circle element', function () {
        const wrapper = shallow(<Point />);
        expect(wrapper.find(Circle).length).toEqual(1);
    });
});
