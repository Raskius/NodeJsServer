import CustomError from "./error.js";


document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display commands when the page loads
    await fetchCommands();

    // Handle form submission to add a new command
    const addCommandForm = document.getElementById('addCommandForm');
    addCommandForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const commandName = document.getElementById('commandName').value;
        await addCommand(commandName);
    });

    // Delegate click event handling to the commandsList for delete icons
    const commandsList = document.getElementById('commandsList');
    commandsList.addEventListener('click', async (event) => {
        // if (event.target.classList.contains('delete-icon')) {
            const commandId = event.target.dataset.commandId;
            await deleteCommand(commandId);
        // }
    });
});

// Fetch commands from the server and display them
async function fetchCommands() {
    try {
        const response = await fetch('/commands');
        const commands = await response.json();

        const commandsList = document.getElementById('commandsList');
        commandsList.innerHTML = '';
        commands.forEach(command => {
            const listCommand = document.createElement('li');
            listCommand.setAttribute('data-command-id', command.id);
            listCommand.textContent = command.name;
            commandsList.appendChild(listCommand);
        });
    } catch (error) {
        console.error('Error fetching commands:', error);
    }
}

// Add a new command to the server and update the UI
async function addCommand(name) {
    try {
        const response = await fetch('/commands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        // Clone the response before reading the body
        const clonedResponse = response.clone();

        if (!response.ok) {
            const errorText = await clonedResponse.text();
            // console.log(errorText);
            throw new CustomError(`Error adding command: ${response.status} ${response.statusText}\n${errorText}`, response.status);
        }
        
        const responseBody = await response.text(); // or response.json() if the body is JSON
        console.log('Response body:', responseBody);

        await fetchCommands(); // Refresh the list after adding a new command
    } catch (error) {
        if(error instanceof CustomError){
            console.error(error);
        }
    }
}

// Delete an command from the server and update the UI
async function deleteCommand(commandId) {
    try {
        const response = await fetch(`/commands/${commandId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error deleting command: ${response.status} ${response.statusText}`);
        }

        await fetchCommands(); // Refresh the list after deleting an command
    } catch (error) {
        console.error('Error deleting command:', error);
    }
}

// # Add multiple in console.log #
//
// for(let i = 0; i < 50; i++){
// 	setTimeout(function(){
// 		document.getElementById("commandName").value = "Text: " + i;
// 		document.querySelector("button").click();
// 	}, 100 * i)
// }

// # Delete all #
//
// const commandsList = document.getElementById('commandsList');
// const liList = commandsList.getElementsByTagName('li');

// for(let i = liList.length - 1; i >= 0; i--){
// 	setTimeout(function(){
// 		liList[i].click()
// 	}, 100 * (liList.length - i))
// }