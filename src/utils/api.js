const baseUrl = "http://localhost:3001";

function handleFetchResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleFetchResponse);
}

function addItem({ _id, name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, name, weather, imageUrl }),
  }).then(handleFetchResponse);
}

function deleteItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then(handleFetchResponse);
}

export { getItems, addItem, deleteItem, handleFetchResponse };
