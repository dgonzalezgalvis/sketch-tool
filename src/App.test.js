import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('App component testing', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<App />); 
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});