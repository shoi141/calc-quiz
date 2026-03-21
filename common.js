// ── 数学ユーティリティ ─────────────────────────────────────
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function lcm(a, b) { return a / gcd(a, b) * b; }
function randomStars(n) {
  return Array.from({length:n}, () => ["⭐","🌟","✨"][randInt(0,2)]).join(" ");
}

// ── 式の評価 ───────────────────────────────────────────────
function evalExpr(expr) {
  try {
    const n = expr
      .replace(/×/g,"*").replace(/÷/g,"/")
      .replace(/−/g,"-").replace(/＋/g,"+")
      .replace(/[^0-9+\-*/().]/g,"");
    if (!n.trim()) return null;
    const r = eval(n); // eslint-disable-line no-eval
    if (typeof r !== "number" || !isFinite(r)) return null;
    return Number.isInteger(r) ? r : Math.round(r * 1000) / 1000;
  } catch { return null; }
}

// 途中式の計算対象部分を抽出する
function getExprToParse(scratch) {
  const lines = scratch.split("\n");
  const last  = lines[lines.length - 1];
  const eq    = last.lastIndexOf("＝");
  return (eq >= 0 ? last.slice(eq + 1) : last).trim();
}

// ── キーパッド定義 ─────────────────────────────────────────
const KEYPAD = [
  [{label:"7",val:"7",type:"num"},{label:"8",val:"8",type:"num"},{label:"9",val:"9",type:"num"},{label:"+",val:"+",type:"op"},{label:"(",val:"(",type:"op"}],
  [{label:"4",val:"4",type:"num"},{label:"5",val:"5",type:"num"},{label:"6",val:"6",type:"num"},{label:"−",val:"-",type:"op"},{label:")",val:")",type:"op"}],
  [{label:"1",val:"1",type:"num"},{label:"2",val:"2",type:"num"},{label:"3",val:"3",type:"num"},{label:"×",val:"×",type:"op"},{label:"÷",val:"÷",type:"op"}],
  [{label:"0",val:"0",type:"num"},{label:"00",val:"00",type:"num"},{label:"⌫",val:"BACK",type:"ctrl"},{label:"＝計算",val:"CALC",type:"calc"},{label:"C",val:"CLEAR",type:"ctrl"}],
];

const Q_OPTIONS   = [5, 10, 15, 20];
