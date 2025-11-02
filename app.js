// This script demonstrates how to:
// 1. Accept user input
// 2. Moderate input for safety
// 3. Call an AI API (Deepseek) to generate content
// 4. Moderate output for safety
// 5. Display results to the user

// Import readline module - this allows us to read user input from the command line
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// Import Deepseek client
const SYSTEM_PROMPT = `You are a helpful, friendly, and safe AI assistant. 
Your goal is to provide accurate and constructive information.
Always be respectful and avoid generating harmful content.`;

// Banned Keywords for moderation
const BANNED_KEYWORDS = [
  'kill',
  'hack', 
  'bomb',
  'exploit',
  'violence',
  'rape'
];

// API configuration - (OpenRouter-Deepseek-API)
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; 
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// INPUT MODERATION FUNCTION
/**
 * @param {string} text
 * @returns {boolean}
 */
function containsBannedContent(text) {
  const lowerCaseText = text.toLowerCase();
  return BANNED_KEYWORDS.some(keyword => lowerCaseText.includes(keyword));
}

// Output Moderation Function
/**
 * @param {string} text
 * @returns {object}
 */
function moderateOutput(text) {
  let moderatedText = text;
  let foundBannedContent = false;
    BANNED_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    if (regex.test(moderatedText)) {
      foundBannedContent = true;
      moderatedText = moderatedText.replace(regex, '[REDACTED]');
    }
    });
    return {
        isSafe: !foundBannedContent,
        text: moderatedText
    }; }

// Function to call Deepseek API
/**
 * @param {string} userInput
 * @returns {Promise<string>}
 */
async function callDeepseekAPI(userInput) {
  if (!OPENROUTER_API_KEY) {
    throw new Error(
      '❌ OPENROUTER_API_KEY not found!\n' +
      'Please set it as an environment variable:\n' +
      'Windows CMD: set OPENROUTER_API_KEY=your-key-here\n' +
      'Windows PowerShell: $env:OPENROUTER_API_KEY="your-key-here"\n' +
      'Then run the script again.'
    );
  }}

     console.log('\n🤖 Sending request to OpenRouter (DeepSeek model)...\n');
     const requestBody = {
       model: 'deepseek/deepseek-chat',
       messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userInput }
       ],
       max_tokens: 500,
       temperature: 0.7
     };

     try {
       const response = await fetch(OPENROUTER_API_URL, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
           'HTTP-Referer': 'http://localhost:3000',
           'X-Title': 'AI Chat Moderation App'
         },
         body: JSON.stringify(requestBody)
       });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenRouter API Error (${response.status}): ${errorData}`);
    }

       const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;
    
    if (!aiMessage) {
      throw new Error('No response content from OpenRouter');
    }
    
    return aiMessage.trim();
    
    } catch (error) {
        console.error('❌ Error calling OpenRouter:', error.message);
        throw error;
    }
// Main function to run the app
async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   AI Chat with Moderation System      ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  const rl = readline.createInterface({ input, output });
  
  try {
    // STEP 1: Get user input
    console.log('💬 Ask me anything (type your question below):\n');
    const userPrompt = await rl.question('You: ');
    
    if (!userPrompt.trim()) {
      console.log('\n⚠️  You didn\'t enter anything. Please try again.');
      return;
    }
    
    // Input Moderation
    console.log('\n🔍 Checking your input for safety...');
    if (containsBannedContent(userPrompt)) {
      console.log('\n❌ Your input violated the moderation policy.');
      console.log('Please rephrase your question without harmful content.\n');
      return;
    }
    console.log('✅ Input is safe!');

    // call Deepseek API
    const aiResponse = await callOpenRouter(userPrompt);
    
    // Output Moderation
    console.log('🔍 Checking AI response for safety...');
    const moderationResult = moderateOutput(aiResponse);
    
    // Display results
    if (!moderationResult.isSafe) {
      console.log('⚠️  Warning: Response contained inappropriate content (redacted below)\n');
    } else {
      console.log('✅ Response is safe!\n');
    }
    
    console.log('═══════════════════════════════════════');
    console.log('AI Response:');
    console.log('═══════════════════════════════════════');
    console.log(moderationResult.text);
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ An error occurred:', error.message);
  } finally {
    rl.close();
  }
}
await main();