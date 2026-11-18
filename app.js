// ===== Chart setup =====
const ctx = document.getElementById('chart');
const MAX_POINTS = 600; // keep ~ last 10 min if ~1 update/sec
const labels = [];
const series = [];

// Create the Chart.js line chart
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [{
      label: 'BTC/USDT',
      data: series,
      borderWidth: 2,
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
      y: {
        display: true,
        ticks: { color: '#c9d6ff' },
        grid: { color: 'rgba(255,255,255,0.06)' }
      }
    },
    elements: { line: { borderJoinStyle: "round" } }
  }
});

// ===== Helper: formatters =====
function fmtTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second:'2-digit' });
}

function updatePriceUI(price, prev) {
  const $p = $('#lastPrice');
  const up = prev !== null && price >= prev;
  $p
    .text(`$${Number(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}`)
    .toggleClass('green', up)
    .toggleClass('red', !up);
  $('#lastTime').text(`Last trade: ${fmtTime(Date.now())}`);
  // line color matches direction
  chart.data.datasets[0].borderColor = up ? '#22c55e' : '#ef4444';
}

// ===== Seed initial history (optional, small burst using Binance REST) =====
// Get last ~100 recent trades to start the line near current level.
async function seed() {
  try {
    const r = await fetch('https://api.binance.com/api/v3/trades?symbol=BTCUSDT&limit=100');
    const trades = await r.json();
    trades.forEach(tr => {
      const t = tr.T || tr.time || Date.now();
      const p = parseFloat(tr.p);
      labels.push(fmtTime(t));
      series.push(p);
    });
    if (labels.length) chart.update();
  } catch(e) {
    // If rate-limited or blocked, we’ll simply start from live stream
    console.warn('Seed failed, streaming only.', e);
  }
}

// ===== Live stream via WebSocket =====
let last = null;
function startStream() {
  const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
  ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    const price = parseFloat(msg.p);   // trade price
    const time  = msg.T;               // trade time (ms)

    // push point, trim buffer
    labels.push(fmtTime(time));
    series.push(price);
    if (labels.length > MAX_POINTS) { labels.shift(); series.shift(); }

    // update UI & chart
    updatePriceUI(price, last);
    last = price;

    // throttle chart redraw to ~10 fps for performance
    const now = performance.now();
    if (!startStream.lastDraw || now - startStream.lastDraw > 100) {
      chart.update('none'); // no animation for snappy feel
      startStream.lastDraw = now;
    }
  };
  ws.onclose = () => {
    // simple retry
    setTimeout(startStream, 1500);
  };
}

// Go
seed().finally(startStream);
