import { useState } from 'react';
import styles from './colorConverter.module.css';

const ColorConverter = () => {

  const [hexColor, setHexColor] = useState('rgb(200, 200, 200)');

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {

    const newColor: string = convertHexToRGB((e.target as HTMLInputElement).value);
    newColor !=='Неверно указан цвет' ? setHexColor(newColor) : setHexColor('rgb(255, 0, 0)');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  function convertHexToRGB(hexColor: string): string {
    let 
      redHex: string,
      greenHex: string,
      blueHex: string,
      res: string;
    if (hexColor.match(/^#[0-9A-Fa-f]{6}$/)) {
      const hexNoHash = hexColor.split('#')[1];
      redHex = hexNoHash.slice(0, 2);
      greenHex = hexNoHash.slice(2, 4);
      blueHex = hexNoHash.slice(4, 6);
      res = `rgb(${convert16T010(redHex)}, ${convert16T010(greenHex)}, ${convert16T010(blueHex)})`;
    } else {
      res = 'Неверно указан цвет';
    }
    
    return res;
  }

  function convert16T010(num16: string): string {
    type ListOfLetter = {
      [A: string]: string,
      B: string,
      C: string,
      D: string,
      E: string,
      F: string,
      a: string,
      b: string,
      c: string,
      d: string,
      e: string,
      f: string,
    }
    const listOfLetter: ListOfLetter = {
      A: '10',
      B: '11',
      C: '12',
      D: '13',
      E: '14',
      F: '15',
      a: '10',
      b: '11',
      c: '12',
      d: '13',
      e: '14',
      f: '15'
    };
    let firstSymbol: string;
    let secondSymbol: string;
    
    if (listOfLetter[num16[0]]) {
      firstSymbol = listOfLetter[num16[0]];
    } else {
      firstSymbol = num16[0];
    }

    if (listOfLetter[num16[1]]) {
      secondSymbol = listOfLetter[num16[1]];
    } else {
      secondSymbol = num16[1];
    }

    return String(Number(firstSymbol) * 16 + Number(secondSymbol));
  }

  return (
    <div className={styles['colorConverter']} style={{ 'backgroundColor': hexColor }}>
      <form className={styles['form']} autoComplete="off" onSubmit={handleSubmit}>
        <input className={styles['inputHexColor']} name='inputHexColor' onInput={handleInput} maxLength={7} placeholder='Input Hex here' />
      </form>
      <div className={styles['rgbDiv']}>{hexColor}</div>
    </div>
  )
}

export default ColorConverter
