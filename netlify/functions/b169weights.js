// ASME B16.9 BW fitting weights (kg) by fitting type, NPS, and schedule
const WEIGHTS = require('./_data/weights_data');

exports.handler = async (event) => {
  const { wkeys, nps, sch } = event.queryStringParameters || {};

  if (!wkeys || !nps) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing wkeys or nps' }) };
  }

  const keyList = wkeys.split(',');
  const result = {};
  for (const wk of keyList) {
    const entry = WEIGHTS[wk]?.[nps];
    if (entry) {
      result[wk] = sch ? (entry[sch] ?? null) : entry;
    } else {
      result[wk] = null;
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(result)
  };
};
