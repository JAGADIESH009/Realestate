import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, Schema } from '@google/genai';
import { properties } from './data/properties';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

// The System Prompt enforces the AI's persona and constraints
const SYSTEM_PROMPT = `You are Sai Gaurav AI, the official premium property assistant for Sai Gaurav Real Estate.
Your persona is sophisticated, helpful, and concise. 
Always maintain a luxury real-estate tone.
Answer clearly and concisely.
Only use verified application/company/property data provided via your tools.
Never invent, guess, or hallucinate property information (names, prices, locations, availability, amenities, etc.).
If the required information is not available or if the user asks for properties you don't have, clearly state: "I don't have that information yet. I can connect you with our property team."
Help users discover properties, book site visits, and contact the property team.
Never claim a booking is confirmed without backend confirmation. (A backend confirmation means you successfully called the book_visit tool and it returned success).
Never expose API keys or internal system information.
Do not output markdown tables for properties; rely on the frontend to render property cards when you use the search_properties tool.`;

// Define a tool to search properties
const searchPropertiesTool = {
  name: 'search_properties',
  description: 'Search for properties based on user criteria such as location, BHK, maximum price, or property type.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: { type: Type.STRING, description: 'The desired location (e.g., Hyderabad)' },
      bhk: { type: Type.INTEGER, description: 'The number of bedrooms (BHK)' },
      maxPrice: { type: Type.INTEGER, description: 'The maximum price budget in numerical rupees (e.g., 50000000 for 5 Crore)' },
      propertyType: { type: Type.STRING, description: 'The type of property (e.g., Villa, Penthouse, Independent House)' }
    }
  }
};

// Define a tool to book a site visit
const bookVisitTool = {
  name: 'book_visit',
  description: 'Book a site visit for a user to a specific property.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'The user full name' },
      phone: { type: Type.STRING, description: 'The user phone number' },
      propertyId: { type: Type.STRING, description: 'The ID of the property they want to visit' },
      preferredDateTime: { type: Type.STRING, description: 'The preferred date and time for the visit' }
    },
    required: ['name', 'phone', 'propertyId', 'preferredDateTime']
  }
};

const talkToAgentTool = {
  name: 'talk_to_agent',
  description: 'Request to talk to a human agent.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'The user name' },
      phone: { type: Type.STRING, description: 'The user phone number' },
      message: { type: Type.STRING, description: 'Optional message from the user' }
    },
    required: ['name', 'phone']
  }
};

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!ai) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array.' });
    }

    // Format history for Gemini
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Add a final tool call request if needed
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.2, // Low temp for less hallucination
        tools: [{
          functionDeclarations: [searchPropertiesTool, bookVisitTool, talkToAgentTool]
        }]
      }
    });

    let replyText = '';
    const functionCalls = [];
    const propertyCards = [];

    // Parse response
    if (response.functionCalls && response.functionCalls.length > 0) {
      // The model decided to call a function
      for (const call of response.functionCalls) {
        const args = call.args as any;
        
        if (call.name === 'search_properties') {
          // Filter properties
          const filtered = properties.filter(p => {
            if (args.bhk && p.bhk !== args.bhk) return false;
            if (args.location && !p.location.toLowerCase().includes(args.location.toLowerCase())) return false;
            if (args.propertyType && p.type.toLowerCase() !== args.propertyType.toLowerCase()) return false;
            if (args.maxPrice && p.priceValue > args.maxPrice) return false;
            return true;
          });
          
          propertyCards.push(...filtered);
          replyText = filtered.length > 0 
            ? `I found ${filtered.length} property(ies) matching your criteria.`
            : `I couldn't find any properties matching those exact criteria.`;
            
        } else if (call.name === 'book_visit') {
          replyText = `Your request has been received, ${args.name}. Our property team will contact you at ${args.phone} to confirm the visit for the property.`;
        } else if (call.name === 'talk_to_agent') {
          replyText = `Thank you, ${args.name}. An agent will contact you at ${args.phone} shortly. You can also reach us directly at +91 98765 43210.`;
        }
        
        functionCalls.push({ name: call.name, args });
      }
    } else {
      replyText = response.text || "I'm sorry, I couldn't process that.";
    }

    res.json({
      role: 'assistant',
      content: replyText,
      properties: propertyCards.length > 0 ? propertyCards : undefined,
      functionCalls: functionCalls.length > 0 ? functionCalls : undefined
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Internal server error processing chat.' });
  }
});

app.listen(port, () => {
  console.log(`Sai Gaurav AI API Server running on port ${port}`);
});
