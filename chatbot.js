document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    addMessage(userInput, "user");
    document.getElementById("userInput").value = "";

    const botResponse = await getBotResponse(userInput);
    addMessage(botResponse, "bot");
    scrollToBottom();
}

async function getBotResponse(userInput) {
    const apiKey = '111111111111111111111111111111111111111111111111';  // Replace with your OpenAI API key

    const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",  // or "gpt-3.5-turbo" if you prefer
            messages: [{ role: "user", content: userInput }],
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
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
