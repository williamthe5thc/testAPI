document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

const responses = {
    "hello": "Hi there! How can I assist you today?",
    "how are you?": "I'm just a bunch of code, but I'm here to help you!",
    "bye": "Goodbye! Have a great day!",
    "default": "Sorry, I didn't understand that. Can you please rephrase?"
};

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    addMessage(userInput, "user");
    document.getElementById("userInput").value = "";

    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        addMessage(botResponse, "bot");
        scrollToBottom();
    }, 500);
}

function getBotResponse(input) {
    input = input.toLowerCase();
    return responses[input] || responses["default"];
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById("messages");
    const message = document.createElement("div");
    message.className = "message " + sender;
    message.textContent = text;
    messagesDiv.appendChild(message);
}

function scrollToBottom() {
    const chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = chatbox.scrollHeight;
}
