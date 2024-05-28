let iconCount = 0;  // Initialize the icon count
const iconArray = [];  // Array to maintain the count of icons added
const edgeArray = [];
let edgeCount = 0;
 // Static array to store edges

document.getElementById('add-icon').addEventListener('click', function() {
    const container = document.getElementById('container');
    const icon = document.createElement('div');

    icon.className = 'icon';

    const iconImage = document.createElement('img');
        iconImage.src = 'https://themayanagari.com/wp-content/uploads/2021/01/9-7.jpg';  // Set the path to your image
        iconImage.alt = `Icon ${iconCount}`;
        iconImage.style.width = '30px';  // Set width of the icon image
        iconImage.style.height = '30px';  // Set height of the icon image

        // Create a label for the icon ID
     const iconLabel = document.createElement('span');
        iconLabel.innerText = iconCount;
        iconLabel.style.marginTop = '5px';
        iconLabel.style.color = 'white';

     icon.appendChild(iconImage);
     icon.appendChild(iconLabel);

    // Update the icon count and array
    iconArray.push(iconCount);

    // Assign a unique id to the icon
    icon.dataset.id = iconCount;
    icon.title = `Icon ${iconCount}`;  // Optional: Set title for easy identification

    // Create a label to show the icon ID

    // Set initial position
    icon.style.top = '50%';
    icon.style.left = '50%';


    container.appendChild(icon);

    console.log('Icons added:', iconArray);  // Log the array to the console
        iconCount++;


       function makeDraggable(icon) {

               function onMouseDown(event) {
                            let shiftX = event.clientX - icon.getBoundingClientRect().left;
                            let shiftY = event.clientY - icon.getBoundingClientRect().top;

                            icon.style.position = 'absolute';
                            icon.style.zIndex = 1000;
                            document.body.append(icon);

                            moveAt(event.pageX, event.pageY);
                            function moveAt(pageX, pageY) {
                                icon.style.left = pageX - shiftX + 'px';
                                icon.style.top = pageY - shiftY + 'px';
                                //container.appendChild(icon);
                                updateEdges();  // Update edges on icon move
                            }

                            function onMouseMove(event) {
                                moveAt(event.pageX, event.pageY) ;
                            }

                            document.addEventListener('mousemove', onMouseMove);

                            icon.onmouseup = function() {
                                document.removeEventListener('mousemove', onMouseMove);
                                icon.onmouseup = null;
                            };

                        }

              icon.onmousedown = onMouseDown;

              icon.ondragstart = function() {
                  return false;
              };

              icon.ondblclick = function() {
                        icon.onmousedown = null;
                        icon.ondragstart = null;
                        icon.style.cursor = 'default';
                    };

          }

      makeDraggable(icon);

      // Add double-click event to fix the position of the icon
      icon.ondblclick = function() {
          icon.onmousedown = null;
          icon.ondragstart = null;
          icon.style.cursor = 'default';
      };
});

// Handle adding edges
document.getElementById('add-edge').addEventListener('click', function() {
    const icon1Id = prompt('Enter the ID of the first icon:');
    const icon2Id = prompt('Enter the ID of the second icon:');
    const weightID = prompt('Enter the weight of the edge:');

    const icon1 = document.querySelector(`.icon[data-id="${icon1Id}"]`);
    const icon2 = document.querySelector(`.icon[data-id="${icon2Id}"]`);

    if (icon1 && icon2 && icon1 !== icon2) {
        const container = document.getElementById('container');
        const edge = document.createElement('div');
        edge.className = 'edge';

        const weightLabel = document.createElement('div');
        weightLabel.className = 'weight';
        weightLabel.innerText = weightID;


        // Add edge data attributes
        edge.dataset.icon1 = icon1Id;
        edge.dataset.icon2 = icon2Id;

        // Update the edge count and array
        edgeCount++;

        // Assign a unique id to the edge
        edge.dataset.id = edgeCount;
        edge.title = `Edge ${edgeCount}`;
        weightLabel.dataset.edgeId = edgeCount;

        console.log("added:" + edge.title);

        container.appendChild(edge);
        container.appendChild(weightLabel);

        // Store the edge endpoints in the edgeArray
        edgeArray.push([parseInt(icon1Id), parseInt(icon2Id), parseInt(weightID),parseInt(edge.dataset.id)]);
        console.log('Edges:', edgeArray);  // Log the edge array to the console

        updateEdges();  // Draw the edge

        edge.ondblclick = function() {
                edge.onmousedown = null;
                edge.ondragstart = null;
                edge.style.cursor = 'default';
            };
    } else {
        alert('Invalid icon IDs. Please make sure both IDs exist and are different.');
    }
});

// Function to update edges
function updateEdges() {
    document.querySelectorAll('.edge').forEach(edge => {
        const icon1 = document.querySelector(`.icon[data-id="${edge.dataset.icon1}"]`);
        const icon2 = document.querySelector(`.icon[data-id="${edge.dataset.icon2}"]`);

        const rect1 = icon1.getBoundingClientRect();
        const rect2 = icon2.getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 4;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;

        edge.style.width = Math.hypot(x2 - x1, y2 - y1) + 'px';
        edge.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
        edge.style.left = x1 + 'px';
        edge.style.top = y1-70 + 'px';

        // Update the weight label position
        const weightLabel = document.querySelector(`.weight[data-edge-id="${edge.dataset.id}"]`);
        if (weightLabel) {
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            weightLabel.style.left = midX + 'px';
            weightLabel.style.top = (midY - 50) + 'px';  // Adjust to position above the edge
        }
    });
}

 function search(button) {
        var formContainer = button.closest('#form-class');
        var source = formContainer.querySelector('#source').value;
        var destination = formContainer.querySelector('#destination').value;


       for (let i = 1; i <= edgeCount; i++) {
           const edgeselect = document.querySelector(`.edge[data-id="${i}"]`);
                             if (edgeselect) {
                                    edgeselect.style.backgroundColor = '#D1C2D5'; // Change the color to green
                            }
       }

        var searchData = {
                    paths: edgeArray,
                    src:source,
                    vertex:iconCount,
                    destination:destination
                };
            fetch('/search-shortest-path', {
                    method: 'POST', // Define the method
                    headers: {
                        'Content-Type': 'application/json' // Specify JSON content type
                    },
                    body: JSON.stringify(searchData) // Convert the object to JSON
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Failed to search the distance");
                        }
                        return response.json(); // Parse the JSON from the response
                    })
                    .then(data => {
                        data.forEach(element => {
                            console.log(element); // Log each element of the array
                            const edgeselect = document.querySelector(`.edge[data-id="${element}"]`);
                            console.log(edgeselect.dataset.id);
                             if (edgeselect) {
                                            edgeselect.style.backgroundColor = 'green'; // Change the color to green
                                        }
                        });
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });

}



