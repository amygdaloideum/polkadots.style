export default function draw({ bgColor, dotColor, dotRadius, dotMargin }) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    const dotDiameter = dotRadius * 2;
    const totalDotWidth = dotRadius * 2 + dotMargin * 2;
    const evenWindowWidth = closestNumber(window.innerWidth + totalDotWidth, totalDotWidth);
    const numberOfDots = (evenWindowWidth / totalDotWidth) * ((window.innerHeight) / dotDiameter);

    /* console.log(`even window width: ${evenWindowWidth}px`);
    console.info(`total dot width (with margins): ${totalDotWidth}px`);
    console.info(`total number of dots: ${numberOfDots}`); */

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = dotColor;
    for (let i = 0; i < numberOfDots; i++) {
      const uncutWidth = (totalDotWidth * i);
      const posX = (uncutWidth % evenWindowWidth) + (Math.floor(uncutWidth / evenWindowWidth) % 2 === 1 ? totalDotWidth / 2 : 0);
      const posY = Math.floor(uncutWidth / evenWindowWidth) * dotDiameter + dotMargin * Math.floor(uncutWidth / evenWindowWidth);
      ctx.beginPath();
      ctx.arc(posX, posY, dotRadius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

function closestNumber(n, m) {
  // find the quotient
  const q = Math.floor(n / m);

  // 1st possible closest number
  const n1 = m * q;

  // 2nd possible closest number
  const n2 = n * m > 0 ? m * (q + 1) : m * (q - 1);

  // if true, then n1 is the required closest number
  if (Math.abs(n - n1) < Math.abs(n - n2)) return n1;

  // else n2 is the required closest number
  return n2;
}
