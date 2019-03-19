import React from 'react';
import { Polygon } from './konva-polygon.component';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import { Group, Line } from 'react-konva';

configure({ adapter: new Adapter() });

describe('Polygon component testing', function () {
    it('renders Group element', function () {
        const wrapper = shallow(<Polygon />);
        expect(wrapper.find(Group).length).toEqual(1);
    });

    it('renders Line element', function () {
        const wrapper = shallow(<Polygon />);
        expect(wrapper.find(Line).length).toEqual(1);
    });
});