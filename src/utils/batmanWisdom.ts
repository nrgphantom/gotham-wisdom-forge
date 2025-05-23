
import { supabase } from "../integrations/supabase/client";

type WisdomType = 
  | "askBatman"
  | "justiceChallenge" 
  | "healthChallenge" 
  | "wisdomQuotes" 
  | "healthProtocols" 
  | "financeTips";

export const fetchBatmanWisdom = async (type: WisdomType) => {
  try {
    const { data, error } = await supabase.functions.invoke("batman-wisdom", {
      body: { type }
    });

    if (error) {
      console.error("Error fetching Batman wisdom:", error);
      return null;
    }

    return data.response;
  } catch (error) {
    console.error("Error invoking batman-wisdom function:", error);
    return null;
  }
};

export const parseWisdomQuotes = (response: string | null): Array<{
  title: string;
  quote: string;
  category: string;
  icon: string;
}> => {
  if (!response) {
    return [];
  }

  try {
    // Split the response into separate quotes (assuming each quote is on a new line)
    const quotes = response.split('\n\n').filter(q => q.trim().length > 0);
    
    const categories = ["Daily Discipline", "Mental Strength", "Strategic Thinking", "Character"];
    const icons = ["⚖️", "🦇", "🎯", "🛡️"];
    const titles = ["The Path of Justice", "Facing Fear", "Preparation", "Integrity"];
    
    return quotes.map((quote, index) => ({
      title: titles[index % titles.length],
      quote: quote.replace(/^"(.*)"$/, '$1').trim(),
      category: categories[index % categories.length],
      icon: icons[index % icons.length]
    }));
  } catch (error) {
    console.error("Error parsing wisdom quotes:", error);
    return [];
  }
};

export const parseHealthProtocols = (response: string | null): Array<{
  title: string;
  quote: string;
  category: string;
  icon: string;
}> => {
  if (!response) {
    return [];
  }

  try {
    const quotes = response.split('\n\n').filter(q => q.trim().length > 0);
    
    const categories = ["Fitness", "Recovery", "Mental Health", "Diet"];
    const icons = ["💪", "😴", "🧠", "🥗"];
    const titles = ["Physical Training", "Rest & Recovery", "Mental Discipline", "Nutrition"];
    
    return quotes.map((quote, index) => ({
      title: titles[index % titles.length],
      quote: quote.replace(/^"(.*)"$/, '$1').trim(),
      category: categories[index % categories.length],
      icon: icons[index % icons.length]
    }));
  } catch (error) {
    console.error("Error parsing health protocols:", error);
    return [];
  }
};

export const parseFinanceTips = (response: string | null): {
  rookie: Array<{
    title: string;
    quote: string;
    category: string;
    icon: string;
  }>;
  wayne: Array<{
    title: string;
    quote: string;
    category: string;
    icon: string;
  }>;
} => {
  if (!response) {
    return { rookie: [], wayne: [] };
  }

  try {
    const quotes = response.split('\n\n').filter(q => q.trim().length > 0);
    
    const rookieCategories = ["Safety Net", "Smart Spending", "Long-term Growth"];
    const rookieIcons = ["🛡️", "💰", "⏰"];
    const rookieTitles = ["Emergency Fund", "Spend Wisely", "Invest Early"];
    
    const wayneCategories = ["Risk Management", "Strategic Investment", "Wealth Building"];
    const wayneIcons = ["🏢", "🧠", "🏭"];
    const wayneTitles = ["Diversification", "Market Psychology", "Passive Income"];
    
    const rookie = quotes.slice(0, 3).map((quote, index) => ({
      title: rookieTitles[index % rookieTitles.length],
      quote: quote.replace(/^"(.*)"$/, '$1').trim(),
      category: rookieCategories[index % rookieCategories.length],
      icon: rookieIcons[index % rookieIcons.length]
    }));
    
    const wayne = quotes.slice(3, 6).map((quote, index) => ({
      title: wayneTitles[index % wayneTitles.length],
      quote: quote.replace(/^"(.*)"$/, '$1').trim(),
      category: wayneCategories[index % wayneCategories.length],
      icon: wayneIcons[index % wayneIcons.length]
    }));
    
    return { rookie, wayne };
  } catch (error) {
    console.error("Error parsing finance tips:", error);
    return { rookie: [], wayne: [] };
  }
};
