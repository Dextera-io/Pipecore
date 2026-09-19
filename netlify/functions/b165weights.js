// ASME B16.5 flange weights (kg) by class, NPS, and flange type
const FLANGE_WEIGHTS = require('./_data/b165weights_data');

exports.handler = async (event) => {
  const { cls, nps, type } = event.queryStringParameters || {};

  if (!cls || !nps) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing cls or nps' }) };
  }

  const clsData = FLANGE_WEIGHTS[cls];
  if (!clsData) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Class not found' }) };
  }

  const npsData = clsData[nps];
  if (!npsData) {
    return { statusCode: 404, body: JSON.stringify({ error: 'NPS not found' }) };
  }

  const result = type ? (npsData[type] ?? null) : npsData;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ weight: result })
  };
};
