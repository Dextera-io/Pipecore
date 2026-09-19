const B169 = require('./_data/b169_data');

exports.handler = async (event) => {
  const { type, nps } = event.queryStringParameters || {};

  if (!type) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing type' }) };
  }

  const sheet = B169[type];
  if (!sheet) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
  }

  const firstKey = sheet.headers[0];
  const data = nps ? sheet.data.filter(r => r[firstKey] === nps) : sheet.data;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ title: sheet.title, headers: sheet.headers, data })
  };
};
