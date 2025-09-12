import { NextResponse } from "next/server";
// Avoid importing heavy mailing libs at module scope to prevent build-time fs access.

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Ensure this route is always dynamic (no prerender) and uses the Node.js runtime
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function sendEmail(formData: ContactForm) {
  const React = (await import("react")).default;
  const sendMail = (await import("@/emails")).default;
  const Contact = (await import("@/emails/Contact")).default as any;
  await sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    subject: formData.subject,
    component: React.createElement(Contact, {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }),
    text: `\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}\n`,
  });
}

export async function POST(request: Request) {
  try {
    const formData: ContactForm = await request.json();
    await sendEmail(formData);
    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (e) {
    return NextResponse.json(
      { message: "Error sending email." },
      { status: 500 }
    );
  }
}
