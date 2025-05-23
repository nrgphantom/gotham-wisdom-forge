
import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const AskBatman = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Array<{type: 'user' | 'batman', content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !apiKey) return;

    const userMessage = question;
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are Batman. Respond with the wisdom, intensity, and grounded philosophy of Bruce Wayne/Batman. Your responses should be:
              - Direct and purposeful, no unnecessary words
              - Grounded in real-world advice and practical wisdom
              - Slightly dark but ultimately hopeful
              - Focused on discipline, justice, preparation, and personal growth
              - Use occasional references to facing fear, doing what's right, and the importance of training/preparation
              - Keep responses between 1-3 sentences, impactful and memorable
              - End with practical advice they can implement today`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.8,
          max_tokens: 200,
        }),
      });

      const data = await response.json();
      const batmanResponse = data.choices[0].message.content;

      setMessages(prev => [...prev, { type: 'batman', content: batmanResponse }]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setMessages(prev => [...prev, { 
        type: 'batman', 
        content: "Even Batman's systems can fail. Check your API connection and try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              ASK BATMAN
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "I'm here to listen. Ask me anything about life, justice, fear, or the path forward."
            </p>
          </div>

          {/* API Key Input */}
          {showApiInput && (
            <div className="gotham-card p-6 rounded-lg mb-8">
              <h3 className="font-batman font-bold text-bat-yellow mb-4">OpenAI API Key Required</h3>
              <p className="text-gray-300 mb-4">To activate Batman's AI wisdom, please enter your OpenAI API key:</p>
              <div className="flex gap-4">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1 bg-gotham-gray border border-gotham-lighter rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-bat-yellow"
                />
                <button
                  onClick={() => setShowApiInput(false)}
                  disabled={!apiKey}
                  className="batman-button px-6 py-3 rounded-lg font-batman font-bold text-gotham-black text-sm uppercase tracking-wide disabled:opacity-50"
                >
                  Activate
                </button>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          <div className="gotham-card rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gotham-gray p-4 border-b border-gotham-lighter">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-bat-yellow rounded-full flex items-center justify-center">
                  <span className="text-gotham-black text-xl">🦇</span>
                </div>
                <div>
                  <h3 className="font-batman font-bold text-white">Batman</h3>
                  <p className="text-gray-400 text-sm">Guardian of Gotham • Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🦇</div>
                  <p className="text-gray-400">Ask Batman for guidance. He's listening.</p>
                </div>
              )}

              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-bat-yellow text-gotham-black ml-auto' 
                      : 'bg-gotham-gray text-gray-300'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gotham-gray text-gray-300 px-4 py-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-bat-yellow rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-bat-yellow rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-bat-yellow rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gotham-lighter">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask Batman for guidance..."
                  disabled={!apiKey || isLoading}
                  className="flex-1 bg-gotham-gray border border-gotham-lighter rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-bat-yellow disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!question.trim() || !apiKey || isLoading}
                  className="batman-button px-6 py-3 rounded-lg font-batman font-bold text-gotham-black text-sm uppercase tracking-wide disabled:opacity-50"
                >
                  {isLoading ? 'Thinking...' : 'Send Signal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskBatman;
