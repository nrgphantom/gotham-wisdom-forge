
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = "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";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type } = await req.json();
    
    let prompt;
    
    if (type === "askBatman") {
      prompt = "Give me a deep, profound, and unique Batman-style life wisdom, lesson, or philosophical insight that helps people improve their lives. Make it sound like Batman is speaking directly to the person. Keep it between 3-5 sentences. Make it impactful, memorable, and actionable.";
    } else if (type === "justiceChallenge") {
      prompt = "Create a new daily justice challenge for today as if Batman is speaking directly to the person. This should be a small, meaningful action someone can take to improve justice, fairness, or integrity in their community or personal life. Keep it practical and meaningful. 1-2 sentences only.";
    } else if (type === "healthChallenge") {
      prompt = "Create a new daily health challenge for today as if Batman is speaking directly to the person. This should be a specific physical exercise or health activity someone can complete today. Make it specific with numbers (like doing 50 push-ups). Keep it challenging but achievable. 1-2 sentences only.";
    } else if (type === "wisdomQuotes") {
      prompt = "Generate 4 short wisdom quotes about justice, discipline, courage and integrity as if Batman is speaking. Each quote should be wise, profound and 1-2 sentences only.";
    } else if (type === "healthProtocols") {
      prompt = "Generate 4 short health advice quotes about physical training, rest, mental discipline and nutrition as if Batman is speaking. Each quote should be wise, actionable and 1-2 sentences only.";
    } else if (type === "financeTips") {
      prompt = "Generate 6 short financial advice quotes (3 for beginners labeled as 'rookie' and 3 for advanced labeled as 'wayne') about emergency fund, spending wisely, investing, diversification, market psychology and passive income as if Batman is speaking. Each quote should be wise, actionable and 1-2 sentences only.";
    } else {
      return new Response(JSON.stringify({ error: "Invalid type specified" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: "You are Batman, the Dark Knight of Gotham. You speak with authority, brevity, and wisdom. Your advice is practical, somewhat dark but ultimately hopeful, focused on discipline, justice, preparation, and personal growth." },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const batmanResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: batmanResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in batman-wisdom function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
