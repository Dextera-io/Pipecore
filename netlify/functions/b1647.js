const { B1647 } = require('./_data/b1647_data');

function isPlaceholder(r){ return r && typeof r.O === 'string' && r.O.trim() === '…'; }

exports.handler = async (event) => {
  const { series, cls, unit, nps } = event.queryStringParameters || {};

  if (!series || !cls || !unit) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing series, cls, or unit' }) };
  }

  const seriesData = B1647[series]?.[cls]?.[unit];
  if (!seriesData) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
  }

  if (nps) {
    let row = seriesData[nps];
    let fromSeriesA = false;
    if (series === 'B' && isPlaceholder(row)) {
      const rowA = B1647['A']?.[cls]?.[unit]?.[nps];
      if (rowA) { row = rowA; fromSeriesA = true; }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ row: row || null, fromSeriesA })
    };
  }

  // No NPS — return all rows
  const result = {};
  for (const [n, row] of Object.entries(seriesData)) {
    let r = row;
    let fromSeriesA = false;
    if (series === 'B' && isPlaceholder(row)) {
      const rA = B1647['A']?.[cls]?.[unit]?.[n];
      if (rA) { r = rA; fromSeriesA = true; }
    }
    result[n] = { row: r, fromSeriesA };
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ sizes: result })
  };
};
