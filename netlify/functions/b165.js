const B165 = require('./_data/b165_data');

exports.handler = async (event) => {
  const { cls, unit, nps } = event.queryStringParameters || {};

  if (!cls || !unit) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing cls or unit' }) };
  }

  const sheet = B165[cls]?.[unit];
  if (!sheet) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
  }

  const data = nps ? sheet.data.filter(r => r.NPS === nps) : sheet.data;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ headers: sheet.headers, data })
  };
};
