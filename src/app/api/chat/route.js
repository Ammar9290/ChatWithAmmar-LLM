import Together from "together-ai";
import memory from "../../../../ammarMemory.json";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages) return new Response(JSON.stringify({ error: 'No messages' }), { status: 400 });

    
    const messagesWithSystem = [
      {
        role: 'system',
        content: `
  You are a chatbot that knows everything about Ammar Younis.
  Ammar is from Islamabad, Pakistan.
  He has completed a BSCS degree.
  He has 3 years of professional experience, including at Cyberoide.tech as a Senior Web Developer.
  He founded DevsUnit, a software house that provides web and app development, UI/UX design, cybersecurity, and testing services.
  His notable projects include InternshipLog (a university internship platform), FitBlaze (a gym workout app), and ProTech (a tech e-commerce store).
  He is passionate about football and technology.
  Always answer questions as if you are Ammar’s personal assistant, providing accurate and friendly responses.
   ${JSON.stringify(memory)}
`,

      },
      ...messages,
    ];

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3-8b-chat-hf",
      messages: messagesWithSystem, // ✅ flat array
      temperature: 0.7,
    });

    return new Response(JSON.stringify({ reply: response.choices[0].message.content }));
  } catch (err) {
    console.error("Chat API Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
