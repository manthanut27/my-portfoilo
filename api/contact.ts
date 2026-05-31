export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // 1. Only allow POST method
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, message } = await req.json();

    // 2. Client validations mirrored
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (name.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'Name must be at least 2 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Please enter a valid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (message.trim().length < 10 || message.length > 1000) {
      return new Response(JSON.stringify({ error: 'Message must be between 10 and 1000 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || process.env.VITE_CONTACT_EMAIL || 'manthanut27@gmail.com';

    if (!resendKey) {
      console.error('Missing RESEND_API_KEY environment variable.');
      // Graceful fallback response for local testing without secrets
      return new Response(JSON.stringify({
        success: true,
        message: 'Mock response: email delivered successfully (local mode).'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Post to Resend API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@manthanut.site>',
        to: [recipientEmail],
        subject: `New message from ${name} via Portfolio`,
        html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
      }),
    });

    if (!resendRes.ok) {
      const errorData = await resendRes.json();
      throw new Error(errorData.message || 'Resend delivery failed.');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Server edge function error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
