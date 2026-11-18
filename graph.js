// ===== Chart setup =====
const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'DOGEUSDT', 'TONUSDT', 'TRXUSDT'];
const charts = {};
const labels = {};
const series = {};
const MAX_POINTS = 600; // ~10 min if ~1 update/sec

symbols.forEach(symbol => {
  const ctx = document.getElementById(`${symbol.toLowerCase().replace('usdt', '')}Chart`);
  labels[symbol] = [];
  series[symbol] = [];
  charts[symbol] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels[symbol],
      datasets: [{
        label: `${symbol.replace('USDT', '/USDT')}`,
        data: series[symbol],
        borderWidth: 1.5,
        tension: 0.35,
        pointRadius: 0,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: {
        x: { display: false },
        y: { display: true, ticks: { color: '#c9d6ff', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.06)' } }
      },
      elements: { line: { borderJoinStyle: 'round' } }
    }
  });
});

// ===== Helper: formatters =====
function fmtTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function updatePriceUI(symbol, price, prev, priceId, timeId, chart) {
  const $p = $(`#${priceId}`);
  const up = prev !== null && price >= prev;
  $p
    .text(`$${Number(price).toLocaleString(undefined, { maximumFractionDigits: 4 })}`)
    .toggleClass('green', up)
    .toggleClass('red', !up);
  $(`#${timeId}`).text(`Last: ${fmtTime(Date.now())}`);
  chart.data.datasets[0].borderColor = up ? '#22c55e' : '#ef4444';
}

// ===== Seed initial history =====
async function seed(symbol) {
  try {
    const r = await fetch(`https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=100`);
    const trades = await r.json();
    trades.forEach(tr => {
      const t = tr.T || tr.time || Date.now();
      const p = parseFloat(tr.p);
      labels[symbol].push(fmtTime(t));
      series[symbol].push(p);
    });
    if (labels[symbol].length) charts[symbol].update();
  } catch(e) {
    console.warn(`Seed failed for ${symbol}, streaming only.`, e);
  }
}

// ===== Live stream via WebSocket =====
function startStream(symbol) {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);
  let last = null;
  ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    const price = parseFloat(msg.p);
    const time = msg.T;

    // Push point, trim buffer
    labels[symbol].push(fmtTime(time));
    series[symbol].push(price);
    if (labels[symbol].length > MAX_POINTS) {
      labels[symbol].shift();
      series[symbol].shift();
    }

    // Update UI & chart
    const priceId = `${symbol.toLowerCase().replace('usdt', '')}LastPrice`;
    const timeId = `${symbol.toLowerCase().replace('usdt', '')}LastTime`;
    updatePriceUI(symbol, price, last, priceId, timeId, charts[symbol]);
    last = price;

    // Throttle chart redraw to ~10 fps
    const now = performance.now();
    if (!startStream.lastDraw || now - startStream.lastDraw > 100) {
      charts[symbol].update('none');
      startStream.lastDraw = now;
    }
  };
  ws.onclose = () => {
    setTimeout(() => startStream(symbol), 1500);
  };
}

// Go
symbols.forEach(symbol => {
  seed(symbol).finally(() => startStream(symbol));
});