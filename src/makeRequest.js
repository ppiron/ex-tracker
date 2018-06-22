export default function makeRequest(endpoint, payload) {
  
  let body;
  if (endpoint === 'new-user') {
    body = {
      'username': payload.username, 
    }
  } else {
    body = {
      'userID': payload.userID,
      'exercise': payload.description,
      'duration': payload.duration,
      'date': payload.date,
    }
  }

  const request = new Request('http://localhost:3300/api/exercise/' + endpoint, {
	    method: 'POST', 
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
    })
  return fetch(request)
    .then( (response) => {
      return response.json();
    })
    .catch( (response) => response)
} 