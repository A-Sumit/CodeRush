document.getElementById("runButton").addEventListener("click", function() {
    const userInput = document.getElementById("inputArea").value;
    const outputDiv = document.getElementById("output");

    // Simulate code execution
    const simulatedOutput = `Output: You entered "${userInput}"`;
    
    // Display output in terminal
    outputDiv.innerText += simulatedOutput + '\n';
    
    // Clear the input area
    document.getElementById("inputArea").value = '';
});
