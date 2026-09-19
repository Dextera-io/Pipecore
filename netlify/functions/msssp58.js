const { MSS_SP58 } = require('./_data/msssp58_data');

exports.handler = async (event) => {
  const { nps } = event.queryStringParameters || {};

  if (!nps) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing nps' }) };
  }

  const row = MSS_SP58[nps];
  if (!row) {
    return { statusCode: 404, body: JSON.stringify({ error: 'NPS not found' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ nps, cs_water: row[0], cs_vapor: row[1], ss_vapor: row[2] })
  };
};
