# 🤖 AI Chat with Moderation System

## � About This Project

This is my **Week 1 project** for the **KodeCamp 5X AI for Developers cohort**! 🎉

As someone diving into AI development, I built this application to learn the fundamentals of working with AI APIs while implementing essential safety features. This project marks my first step in understanding how to create responsible AI-powered applications.

## 📖 What I Built

This is a command-line JavaScript application that demonstrates:
- ✅ Accepting user input safely from the terminal
- ✅ Implementing content moderation (input & output filtering)
- ✅ Integrating with DeepSeek's AI API
- ✅ Handling errors gracefully
- ✅ Displaying moderated AI responses

**Tech Stack:**
- **Runtime:** Node.js (v18+)
- **AI Provider:** DeepSeek API
- **Language:** JavaScript (ES6+)
- **Key Concepts:** Async/Await, API Integration, Content Moderation

---

## 🎯 Learning Objectives

By studying this code, you'll learn:

1. **API Integration** - How to make HTTP requests to AI services
2. **Content Moderation** - How to filter harmful content
3. **Async Programming** - Using async/await for asynchronous operations
4. **Environment Variables** - Storing sensitive data securely
5. **Error Handling** - Managing errors in JavaScript
6. **User Input** - Reading from command line using readline

---

## 🚀 Setup Instructions

### Step 1: Get a DeepSeek API Key

1. Go to [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up for an account
3. Navigate to API Keys section
4. Click "Create API Key"
5. **Copy your API key** (it will look like: sk-...)
6. 🎉 DeepSeek is very affordable and great for learning!

### Step 2: Install Node.js

- Download from [nodejs.org](https://nodejs.org/)
- Choose the LTS (Long Term Support) version
- Install with default settings

### Step 3: Set Your API Key

**Windows Command Prompt:**
```cmd
set DEEPSEEK_API_KEY=your-actual-api-key-here
```

**Windows PowerShell:**
```powershell
$env:DEEPSEEK_API_KEY="your-actual-api-key-here"
```

**Note:** Replace `your-actual-api-key-here` with your real API key!

### Step 4: Run the Application

```cmd
node app.js
```

---

## 📋 How It Works

### 1. **User Input**
```
You type: "What is artificial intelligence?"
```

### 2. **Input Moderation** 
```
System checks: Does it contain banned keywords?
- "kill" ❌
- "hack" ❌
- "bomb" ❌
Result: ✅ Safe to proceed
```

### 3. **API Call**
```
System sends to DeepSeek:
- System Prompt: "You are a helpful assistant..."
- User Prompt: "What is artificial intelligence?"
```

### 4. **Output Moderation**
```
AI responds: "Artificial intelligence is..."
System checks response for banned words
Result: ✅ Safe to display
```

### 5. **Display Result**
```
Shows you the AI's response!
```

---

## 🧪 Testing Scenarios

### Test 1: Normal Question
```
You: What is the capital of France?
Expected: AI responds normally
```

### Test 2: Banned Keyword in Input
```
You: How to hack a system?
Expected: "Your input violated the moderation policy."
```

### Test 3: Empty Input
```
You: [press enter without typing]
Expected: Warning about empty input
```

---

## 🔧 Code Structure

```
app.js
├── Configuration Section
│   ├── System Prompt (AI behavior)
│   ├── Banned Keywords List
│   └── API Settings
│
├── Moderation Functions
│   ├── containsBannedContent() - Input check
│   └── moderateOutput() - Output check
│
├── API Call Function
│   └── callOpenAI() - Sends request to OpenAI
│
└── Main Application Flow
    ├── Get user input
    ├── Check input safety
    ├── Call AI API
    ├── Check output safety
    └── Display result
```

---

## 💡 Key Concepts Explained

### 1. **Async/Await**
```javascript
// 'async' makes the function return a Promise
async function getData() {
  // 'await' waits for the Promise to complete
  const result = await fetch(url);
  return result;
}
```

### 2. **Environment Variables**
```javascript
// Store secrets outside your code
const apiKey = process.env.OPENAI_API_KEY;
```

### 3. **Moderation Strategy**
- **Input**: Block immediately if harmful
- **Output**: Redact harmful content with `[REDACTED]`

### 4. **API Request Format (DeepSeek)**
```javascript
{
  model: "deepseek-chat",
  messages: [
    { role: "system", content: "You are..." },
    { role: "user", content: "Question?" }
  ],
  max_tokens: 500,
  temperature: 0.7
}
```

---

## ⚠️ Important Notes

1. **API Key Security**: 
   - Never share your API key
   - Never commit it to Git
   - Use environment variables

2. **API Costs**:
   - DeepSeek is very affordable ($0.14 per 1M input tokens)
   - One of the cheapest AI APIs available
   - Monitor your usage at [DeepSeek Platform](https://platform.deepseek.com/)

3. **Moderation Limitations**:
   - This is a basic keyword-based system
   - Production apps use advanced ML-based moderation
   - DeepSeek also has built-in content filtering!

---

## 🎓 Next Steps

To improve this project, try:

1. ✨ Add more sophisticated moderation (use OpenAI's Moderation API)
2. 📝 Save conversation history
3. 🌐 Create a web interface (HTML/CSS)
4. 💾 Store responses in a database
5. 🔄 Add retry logic for failed requests
6. 📊 Add logging for monitoring

---

## 🐛 Troubleshooting

### "DEEPSEEK_API_KEY not found"
- Make sure you set the environment variable
- Run it in the same terminal window
- Check for typos in the variable name

### "fetch is not defined"
- You need Node.js version 18 or higher
- Update Node.js from nodejs.org

### "API Error 401: Unauthorized"
- Your API key is invalid or expired
- Check if you copied it correctly (no extra spaces!)
- Generate a new key at [DeepSeek Platform](https://platform.deepseek.com/)

### "API Error 429: Rate Limit"
- You're sending requests too quickly
- Wait a minute and try again
- Check your account's rate limits

---

## 📚 Resources

- [DeepSeek Platform](https://platform.deepseek.com/)
- [DeepSeek API Documentation](https://platform.deepseek.com/api-docs/)
- [Node.js Async Programming](https://nodejs.dev/learn/modern-asynchronous-javascript-with-async-and-await)
- [Environment Variables Guide](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs)

---

## 📞 Need Help?

If you're stuck:
1. Read the error message carefully
2. Check the troubleshooting section
3. Review the code comments
4. Search the error on Google/Stack Overflow

---

**Happy Learning! 🚀**
