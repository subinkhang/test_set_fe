import React from 'react';
import { render, screen } from '@testing-library/react';
import History from './History';

describe('History storage', () => {
  it('History storage as expected', async () => {
      
    localStorage.setItem('history', JSON.stringify(['5 + 5 = 10']));
    
    render(<History />);
    
      
    const historyHeading = screen.getByText('History');
    expect(historyHeading).toBeDefined();
    
    const historyItem = screen.getByText('5 + 5 = 10');
    expect(historyItem).toBeDefined();
  });
});