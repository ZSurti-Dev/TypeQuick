// DOM Elements
const textArea = document.getElementById("text");
const result = document.getElementById("result");
const sampleText = document.getElementById("sample-text");
const resetBtn = document.getElementById("reset-btn");

// Variables for tracking
let startTime;
let isTyping = false;
let typingTimeout;

// Function to calculate typing speed
function calculateTypingSpeed() {
    const endTime = new Date();
    const totalTimeInMinutes = (endTime - startTime) / 1000 / 60;
    const typedText = textArea.value.trim();
    const wordsTyped = typedText.split(/\s+/).length;
    
    // Calculate WPM
    const wpm = Math.round(wordsTyped / totalTimeInMinutes);
    
    // Calculate accuracy
    const sampleWords = sampleText.textContent.substring(0, typedText.length);
    let correctChars = 0;
    
    for (let i = 0; i < typedText.length; i++) {
        if (i < sampleWords.length && typedText[i] === sampleWords[i]) {
            correctChars++;
        }
    }
    
    // const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 0;
    
    // Update result message with performance feedback
    if (wpm < 30) {
        result.textContent = `Your typing speed is ${wpm} WPM. Keep practicing!`;
        result.className = "text-lg font-medium text-yellow-600";
    } else if (wpm < 50) {
        result.textContent = `Good job! ${wpm} WPM. You're getting there!`;
        result.className = "text-lg font-medium text-green-600";
    } else if (wpm < 70) {
        result.textContent = `Impressive! ${wpm} WPM. You're a fast typist!`;
        result.className = "text-lg font-medium text-blue-600";
    } else {
        result.textContent = `Amazing! ${wpm} WPM. You're a typing master!`;
        result.className = "text-lg font-medium text-purple-600";
    }
    
    // Reset typing state
    isTyping = false;
}

// Event listener for typing
textArea.addEventListener("input", () => {
    // Start timing when user begins typing
    if (!isTyping) {
        isTyping = true;
        startTime = new Date();
    }
    
    // Clear previous timeout and set a new one
    clearTimeout(typingTimeout);
    
    // Calculate speed after 5 seconds of inactivity
    typingTimeout = setTimeout(() => {
        if (textArea.value.trim().length > 0) {
            calculateTypingSpeed();
        }
    }, 5000);
});

// Reset functionality
resetBtn.addEventListener("click", () => {
    // Clear the textarea
    textArea.value = "";
    
    // Reset the result message
    result.textContent = "Start typing to calculate your speed";
    result.className = "text-lg font-medium text-indigo-700";
    
    // Reset the typing state
    isTyping = false;
    clearTimeout(typingTimeout);
    
    // Focus on the textarea
    textArea.focus();
});

// Initialize with focus on textarea
textArea.focus();