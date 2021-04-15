import React from 'react';
import App from './App';
import { mount } from 'enzyme';

describe('APP testing', () => {

  it('Shoud be rendered the father container', ()=>{
    const wrapper = mount(
      <App/>
    );
    const appContainer = wrapper.find("[className='App']");
    expect(appContainer).toBeTruthy();
  });
  
});
