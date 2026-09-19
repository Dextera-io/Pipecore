const B16_48 = require('./_data/b1648_data');

exports.handler = async (event) => {
  const { cls, nps } = event.queryStringParameters || {};

  if (!cls) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing cls' }) };
  }

  const rows = B16_48['RF']?.[cls];
  if (!rows) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Class not found' }) };
  }

  const data = nps ? rows.filter(r => r.nps === nps) : rows;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ data })
  };
};
