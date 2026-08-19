export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("NOVA Worker läuft", {
        headers: corsHeaders
      });
    }

    try {
      const data = await request.json();

      const message = data.message;

      if (!message) {
        return new Response(
          JSON.stringify({ error: "Keine Nachricht erhalten." }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders
            }
          }
        );
      }

      return new Response(
        JSON.stringify({
          reply: "NOVA hat deine Nachricht erhalten: " + message
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Fehler beim Verarbeiten der Anfrage." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }
  }
};
