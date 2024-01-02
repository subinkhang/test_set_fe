
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from './Calculator';


describe('resetClickHandler function', () => {
  it('resetClickHandler reset calculator', () => {
    const { getByText } = render(<Calculator />);
  
    const numberButton = getByText('7');
    fireEvent.click(numberButton);
    const anotherNumberButton = getByText('8');
    fireEvent.click(anotherNumberButton);

    const screen = getByText('78');
    expect(screen).toBeDefined();

    const resetButton = getByText('C');
    fireEvent.click(resetButton);

    expect(screen.textContent).toEqual("0");
    expect(screen.textContent).not.toEqual('78');
  });
});

describe('invertClickHandler function', () => {
  it('invertClickHandler invert the number', async () => {
    const { getByText } = render(<Calculator />);

    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
  
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    const numberButton = getByText('7');
    fireEvent.click(numberButton);

    const invertButton = getByText('+/-');
    fireEvent.click(invertButton);

    expect(screenValue.textContent).toEqual("-7");
  });
});


describe('percentClickHandler function', () => {
  it('percentClickHandler tính toán phần trăm chính xác', async () => {
    const { getByText } = render(<Calculator />);

    // get screenValue
    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    const numberButton = getByText('7');
    fireEvent.click(numberButton);
    const numberButton2 = getByText('8');
    fireEvent.click(numberButton2);

    const percentButton = getByText('%');
    fireEvent.click(percentButton);
    
    // expected value
    expect(screenValue.textContent).toEqual("0.78");
  });
});


// // //==============================================================================================
describe('equalsClickHandler function', () => {
  it('equalsClickHandler calculates and displays the correct result for division', async () => {
    const { getByText } = render(<Calculator />);
  
    // get screenValue
    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    const numberButton = getByText('8');
    fireEvent.click(numberButton);

    const divide = getByText('/');
    fireEvent.click(divide);

    const numberButton2 = getByText('2');
    fireEvent.click(numberButton2);

    const equal = getByText('=');
    fireEvent.click(equal);
    
    // expected value
    expect(screenValue.textContent).toEqual("4");
  });
});

// // signClick================================================================================
describe('signClick function', () => {
  it('signClickHandler appends a sign to the current number', async () => {
    const { getByText } = render(<Calculator />);
    
    // get screenValue
    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    const numberButton = getByText('7');
    fireEvent.click(numberButton);

    const plus = getByText('+');
    fireEvent.click(plus);

    const numberButton2 = getByText('8');
    fireEvent.click(numberButton2);
    
    // expected value
    expect(screenValue.textContent).toEqual("7+8");
  });
});


describe('signClick function', () => {
  it('signClickHandler does not duplicate a sign', async () => {
    const { getByText } = render(<Calculator />);
      
    // get screenValue
    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    const numberButton = getByText('7');
    fireEvent.click(numberButton);

    // first sign click
    const plus = getByText('+');
    fireEvent.click(plus);
    // next after first sign click
    const plus2 = getByText('+');
    fireEvent.click(plus2);

    const plus3 = getByText('-');
    fireEvent.click(plus3);

    const plus4 = getByText('x');
    fireEvent.click(plus4);

    const plus5 = getByText('/');
    fireEvent.click(plus5);
    
    // expected value
    expect(screenValue.textContent).toEqual("7+");
  });
});


// // commaClick =================================================================
describe('commaClick function', () => {
  it('commaClickHandler appends a comma to a number with decimal places', async () => {
    const { getByText } = render(<Calculator />);
        
    // get screenValue
    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    const numberButton = getByText('7');
    fireEvent.click(numberButton);

    // comma click
    const comma = getByText(',');
    fireEvent.click(comma);

    const numberButton2 = getByText('8');
    fireEvent.click(numberButton2);
    
    // expected value
    expect(screenValue.textContent).toEqual("7,8");
  });
});


describe('commaClick function', () => {
  it('commaClickHandler does not append a comma twice', async () => {
    const { getByText } = render(<Calculator />);
          
    // get screenValue
    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    const numberButton = getByText('7');
    fireEvent.click(numberButton);

    // comma click
    const comma = getByText(',');
    fireEvent.click(comma);

    const numberButton2 = getByText('8');
    fireEvent.click(numberButton2);

    // comma click 2
    const comma2 = getByText(',');
    fireEvent.click(comma2);
    
    // expected value
    expect(screenValue.textContent).toEqual("7,8");
  });
});


// //numClick===================================================================
describe('numClick function', () => {
  it('numClickHandler appends a number to the current number', async () => {
    const { getByText } = render(<Calculator />);
            
    // get screenValue
    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    const numberButton = getByText('7');
    fireEvent.click(numberButton);

    const numberButton2 = getByText('8');
    fireEvent.click(numberButton2);
    
    // expected value
    expect(screenValue.textContent).toEqual("78");
  });
});


describe('numClick function', () => {
  it('numClickHandler does not append a number if the input is too long', async () => {
    const { getByText } = render(<Calculator />);
              
    // get screenValue
    await waitFor(() => {
      expect(getByText('0', { selector: '.screen' })).toBeDefined();
    });
    const screenValue = getByText('0', { selector: '.screen' });
    expect(screenValue).toBeDefined();

    // Enter a number that is 16 characters long
    userEvent.type(screen.getByRole('button', { name: '1' }), '1'.repeat(16));
    

    const numberButton = getByText('7');
    for (let i = 0; i < 16; i++) {
      fireEvent.click(numberButton);
    }

    const numberButton2 = getByText('8');
    fireEvent.click(numberButton2);
    
    // expected value
    expect(screenValue.textContent).toEqual("7777777777777777");
  });
});
