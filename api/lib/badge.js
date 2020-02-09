const pug = require('pug');

const title = 'slack';

function width(str) {
  return 6 * str.length;
}

const svgTmpl =
  `svg(xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=wd height="20")\n` +
  `  linearGradient(x2="0" y2="100%")#b\n` +
  `    stop(offset="0" stop-color="#bbb" stop-opacity=".1")\n` +
  `    stop(offset="1" stop-opacity=".1")\n` +
  `  clipPath#a\n` +
  `    rect(width=wd height="20" rx="3" fill="#fff")\n` +
  `  g(clip-path="url(#a)")\n` +
  `    path(fill='#' + colorA d='M0 0h' + left + 'v20H0z')\n` +
  `    path(fill='#' + colorB d='M'+left + ' 0h' + (wd-left) + 'v20H' + left +'z')\n` +
  `    path(fill="url(#b)" d='M0 0h' + wd + 'v20H0z')\n` +
  `  g(fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110")\n` +
  `    text(x="195" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${title.length*54}") ${title}\n` +
  `    text(x="195" y="140" transform="scale(.1)" textLength="${title.length*54}") ${title}\n` +
  `    text(x=(wd * 5 + 195) y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength=(value.length*60)) #{value}\n` +
  `    text(x=(wd * 5 + 195) y="140" transform="scale(.1)" textLength=(value.length*60)) #{value}\n`;

module.exports = {
  badge: function(presence, total, customColorA, customColorB) {
    const fn = pug.compile(svgTmpl);
    const value = `${presence}/${total}`;
    const left = width(title) + 8;
    const wd = left + width(value) + 22;
    const colorA = customColorA || '555';
    const colorB = customColorB || '39AE85';
    return fn({ value, wd, left, colorA, colorB });
  },
};
