import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss, isMediaRuleCorrect } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');
const parts = css.split('@media');
const mediaQuery = parts[1];

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it("html-1 gallery-section class'ına sahip section eklenmiş", () => {
    const element = container.querySelector('section.gallery-section');
    expect(element).toBeInTheDocument();
  });

  it('html-2 gallery-section içine div.gallery-container eklenmiş', () => {
    const element = container.querySelector(
      'section.gallery-section div.gallery-container'
    );
    expect(element).toBeInTheDocument();
  });

  it('html-3 gallery-container içine h2 doğru metin ile eklenmiş', () => {
    const element = container.querySelector('div.gallery-container h2');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('YEMEKLERİMİZ');
  });

  it('html-4 gallery-container içine div.gallery-content eklenmiş', () => {
    const element = container.querySelector(
      'div.gallery-container div.gallery-content'
    );
    expect(element).toBeInTheDocument();
  });

  it('html-5 gallery-content içinde 9 resim var ve linkleri doğru', () => {
    const element = container.querySelectorAll('div.gallery-content img');
    expect(element.length).toBe(9);
    expect(element[0].src).toMatch(/avocadotoast/i);
    expect(element[1].src).toMatch(/burger/i);
    expect(element[2].src).toMatch(/poutine/i);
    expect(element[3].src).toMatch(/ribs/i);
    expect(element[4].src).toMatch(/sandwich/i);
    expect(element[5].src).toMatch(/sausage/i);
    expect(element[6].src).toMatch(/steak/i);
    expect(element[7].src).toMatch(/tacos/i);
    expect(element[8].src).toMatch(/wings/i);
  });

 
  it("css-1 gallery-content class'ı için istenenler yapılmış.", () => {
    expect(isPropertySetInCss(css, '.gallery-content', 'display', 'flex')).toBe(true);
    expect(
      isPropertySetInCss(css, '.gallery-content', 'justify-content', 'space-around')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.gallery-content', 'flex-wrap', 'wrap')).toBe(true);
    expect(isPropertySetInCss(css, '.gallery-content', 'row-gap', '2rem')).toBe(true);
  });

  it("css-2 gallery-content class'ıdanki resimlerin genişliği 30% yapılmış.", () => {
    expect(isPropertySetInCss(css, '.gallery-contentimg', 'width', '30%')).toBe(true);
  });


  it('css-3 responsive için gallery-content classındaki itemlar dikey olarak sıralanması için flex ayarını yapılmış', () => {
    expect(
      isPropertySetInCss(mediaQuery, '.gallery-content', 'flex-direction', 'column')
    ).toBe(true);
  });

  it('css-4 responsive için gallery-content classındaki resimler için genişlik 100% yapılmış', () => {
    expect(
      isPropertySetInCss(mediaQuery, '.gallery-contentimg', 'width', '100%')
    ).toBe(true);
  });

  it('css-5 responsive için gallery-contentdeki ilk 3 resimden sonrası gizlenmiş', () => {
    expect(
      isPropertySetInCss(mediaQuery, '.gallery-contentimg:nth-child(n+4)', 'display', 'none')
    ).toBe(true);
  });
  
  
});
