document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display items when the page loads
    fetchItems();
  
    // Handle form submission to add a new item
    const addItemForm = document.getElementById('addItemForm');
    addItemForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const itemName = document.getElementById('itemName').value;
      addItem(itemName);
    });
  });
  
  // Fetch items from the server and display them
  function fetchItems() {
    fetch('/items')
      .then(response => response.json())
      .then(items => {
        const itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = '';
        items.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item.name;
          itemsList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching items:', error));
  }
  
  // Add a new item to the server and update the UI
  function addItem(itemName) {
    fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: itemName }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error adding item: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        fetchItems(); // Refresh the list after adding a new item
      })
      .catch(error => console.error('Error adding item:', error));
  }
  