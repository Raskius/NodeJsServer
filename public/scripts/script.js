document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display items when the page loads
    await fetchItems();

    // Handle form submission to add a new item
    const addItemForm = document.getElementById('addItemForm');
    addItemForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const itemName = document.getElementById('itemName').value;
        await addItem(itemName);
    });

    // Delegate click event handling to the itemsList for delete icons
    const itemsList = document.getElementById('itemsList');
    itemsList.addEventListener('click', async (event) => {
        // if (event.target.classList.contains('delete-icon')) {
            const itemId = event.target.dataset.itemId;
            await deleteItem(itemId);
        // }
    });
});

// Fetch items from the server and display them
async function fetchItems() {
    try {
        const response = await fetch('/items');
        const items = await response.json();

        const itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = '';
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-item-id', item.id);
            listItem.textContent = item.name;
            itemsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Add a new item to the server and update the UI
async function addItem(name) {
    try {
        const response = await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error(`Error adding item: ${response.status} ${response.statusText}`);
        }

        await fetchItems(); // Refresh the list after adding a new item
    } catch (error) {
        console.error('Error adding item:', error);
    }
}

// Delete an item from the server and update the UI
async function deleteItem(itemId) {
    try {
        const response = await fetch(`/items/${itemId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error deleting item: ${response.status} ${response.statusText}`);
        }

        await fetchItems(); // Refresh the list after deleting an item
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}
