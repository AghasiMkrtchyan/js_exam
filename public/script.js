const getBtn = document.getElementById('getBtn');
const postBtn = document.getElementById('postBtn');
const output = document.getElementById('output');

// GET request
getBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('/items');
    const data = await res.json();
    output.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (err) {
    output.textContent = 'Error fetching data';
  }
});

// POST request
postBtn.addEventListener('click', async () => {
  const name = prompt('Enter name:');
  const surname = prompt('Enter surname:');

  if (!name || !surname) return alert('Name and surname required');

  try {
    const res = await fetch('/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname })
    });

    const data = await res.json();
    output.innerHTML = `<p>New item created:</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (err) {
    output.textContent = 'Error creating item';
  }
});
