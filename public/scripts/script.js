import CustomError from "./error.js";


document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display commands when the page loads
    await fetchCommands();

    // Handle form submission to add a new command
    const addCommandForm = document.getElementById('addCommandForm');
    addCommandForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const commandName = document.getElementById('commandName').value;
        const commandDescription = document.getElementById('commandDescription').value;
        const commandExamples = document.getElementById('commandExamples').value;
        await addCommand(commandName, commandDescription, commandExamples);
    });

});

function addOnDeleteCommandHandler(){
    const deleteIcons = document.querySelectorAll('.delete-icon');
    deleteIcons.forEach(deleteIcon => {
        deleteIcon.addEventListener('click', async (event) => {
            const clickedLi = event.target.closest('li');

            if (clickedLi) {
                const commandId = clickedLi.dataset.commandId;
                // alert(commandId)
                await deleteCommand(commandId);
            }
        });
    })

}

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

            // Create a container for the command details
            const commandDetails = document.createElement('div');
            commandDetails.classList.add('command-details');

            // Create a larger font size element for the name
            const nameElement = document.createElement('h4');
            nameElement.classList.add('command-name');
            nameElement.textContent = command.name;

            // Create a smaller font size element for the description
            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('command-description');
            descriptionElement.textContent = command.description;

            const deleteElement = document.createElement('div')
            deleteElement.classList.add('delete-icon')
            deleteElement.title = `Delete '${command.name}' command`
            deleteElement.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`

            // Append elements to the command details container
            commandDetails.appendChild(nameElement);
            commandDetails.innerHTML += ' - '; // Add a separator
            commandDetails.appendChild(descriptionElement);
            commandDetails.appendChild(deleteElement);

            // Append the command details container to the list item
            listCommand.appendChild(commandDetails);

            // Append the list item to the commands list
            commandsList.appendChild(listCommand);
        });

        // Create click handler for delete icons
        addOnDeleteCommandHandler();

    } catch (error) {
        console.error('Error fetching commands:', error);
    }
}


// Add a new command to the server and update the UI
async function addCommand(name, description, examples) {
    try {
        const response = await fetch('/commands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, examples }),
        });


        // Clone the response before reading the body
        const clonedResponse = response.clone();

        if (!response.ok) {
            const errorText = await clonedResponse.text();
            throw new CustomError(`Error adding command: ${response.status} ${response.statusText}\n${errorText}`, response.status, errorText);
        }
        
        const responseBody = await response.text(); // or response.json() if the body is JSON
        console.log('Response body:', responseBody);

        await fetchCommands(); // Refresh the list after adding a new command
        showSnackbar(JSON.parse(responseBody).message, false);
    } catch (error) {
        if(error instanceof CustomError){
            console.error(error);
            showSnackbar(JSON.parse(error.errorText).error, true);
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
        const responseBody = await response.text(); // or response.json() if the body is JSON

        await fetchCommands(); // Refresh the list after deleting an command
        
        showSnackbar(JSON.parse(responseBody).message, false);
    } catch (error) {
        console.error('Error deleting command:', error);
        console.log(error);
        showSnackbar(JSON.parse(error.errorText).error, false);
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


function showSnackbar(text, isError) {
    const snackbar = document.getElementById('snackbar');
    snackbar.innerText = text;
    snackbar.classList.add('show');
    snackbar.classList.add(isError ? 'error' : 'success');

    setTimeout(() => {
        snackbar.classList.remove('show');
    }, 3000); // Hide after 3 seconds (adjust as needed)
}