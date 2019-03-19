import React from 'react';
import { Label } from './konva-label.component';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import { Group, Text } from 'react-konva';

configure({ adapter: new Adapter() });

describe('Label component testing', function () {
    it('renders Group element', function () {
        const wrapper = shallow(<Label />);
        expect(wrapper.find(Group).length).toEqual(1);
    });

    it('renders Text element', function () {
        const wrapper = shallow(<Label />);
        expect(wrapper.find(Text).length).toEqual(1);
    });
});