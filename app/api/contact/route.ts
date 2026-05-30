import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    if (typeof message !== 'string' || message.length < 10) {
      return NextResponse.json(
        { error: 'Message too short (min 10 chars)' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long (max 1000 chars)' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

    if (!resendApiKey || !recipientEmail) {
      // If Resend is not configured, return success anyway (dev mode)
      console.log('Contact form submission (Resend not configured):', { name, email, message });
      return NextResponse.json({ success: true });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'portfolio@manthan.dev',
        to: recipientEmail,
        reply_to: email,
        subject: `Portfolio contact: ${name}`,
        html: `
          <h2>New Portfolio Contact</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <hr />
          <p>${message.replace(/\n/g, '<br />')}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error('Resend API error:', errorData);
      return NextResponse.json(
        { error: 'Email delivery failed, please try again' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

// Handle non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
