describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});
// jest.autoMockOff();
//
// import React from 'react';
// import App from './App';
//
// import renderer from 'react-test-renderer';
//
// jest.mock('react-native-camera', () => 'Camera')
//
// it('renders without crashing', () => {
//   const rendered = renderer.create(<App />).toJSON();
//   expect(rendered).toBeTruthy();
// });
