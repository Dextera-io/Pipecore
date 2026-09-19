// ASME B16.47 large flange weights (kg) by series, class, NPS, and type (wn/bl)
const { B1647_WEIGHTS } = require('./_data/b1647weights_data');

exports.handler = async (event) => {
  const { series, cls, nps, type } = event.queryStringParameters || {};

  if (!series || !cls || !nps) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing series, cls, or nps' }) };
  }

  const entry = B1647_WEIGHTS?.[series]?.[cls]?.[nps];
  if (!entry) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
  }

  const result = type ? (entry[type] ?? null) : entry;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ weight: result })
  };
};
