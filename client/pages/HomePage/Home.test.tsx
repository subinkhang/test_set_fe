
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';


describe('Home Page', () => {
  it('renders Hello World successfully', async () => {
    render(<Home />);
  
    const heading = screen.getByText('Hello World');
    expect(heading).toBeDefined();
  });
});