const BASE_URL = 'http://valerystatinov.me/api';
const TOKEN = localStorage.getItem('token');

function IsJSON(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
}

export const request = async (params, method = 'GET', body) => {
  return fetch(`${BASE_URL}${params}`, {
    method,
    headers: {
      Token: TOKEN ? TOKEN : '',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(body),
  })
    .then((res) => (res.text()))
    .then((data) => (IsJSON(data) ? JSON.parse(data) : data ? alert(data) : ''))
    .catch((error) => alert(`Seems like an error: ${error.json()}`));
};
