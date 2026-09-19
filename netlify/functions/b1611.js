const B1611 = require('./_data/b1611_data');

exports.handler = async (event) => {
  const { type, unit, nps } = event.queryStringParameters || {};

  if (!type || !unit) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing type or unit' }) };
  }

  const sheet = B1611[type];
  if (!sheet) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
  }

  const unitData = sheet[unit];
  if (!unitData) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Unit not found' }) };
  }

  const row = nps ? unitData[nps] : null;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ classes: sheet.classes, row: row || null })
  };
};
