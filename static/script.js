async function sendMessage() {
    let userInput = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");
    let message = userInput.value.trim();

    if (!message) return;

    // Display user message
    let userMsgDiv = document.createElement("div");
    userMsgDiv.className = "user-message";
    userMsgDiv.innerText = message;
    chatBox.appendChild(userMsgDiv);

    // Show loading indicator
    let loadingMsgDiv = document.createElement("div");
    loadingMsgDiv.className = "bot-message";
    loadingMsgDiv.innerText = "Thinking...";
    chatBox.appendChild(loadingMsgDiv);

    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send request to FastAPI
    let response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    });

    let data = await response.json();

    // Remove loading indicator
    chatBox.removeChild(loadingMsgDiv);

    // Display DeepSeek response
    let botMsgDiv = document.createElement("div");
    botMsgDiv.className = "bot-message";
    botMsgDiv.innerText = data.response || "Error communicating with DeepSeek.";
    chatBox.appendChild(botMsgDiv);

    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow "Enter" key to send messages
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
