import { NextResponse } from "next/server";
import React from "react";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Ensure this route is always dynamic (no prerender) and uses the Node.js runtime
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function validate(formData: ContactForm) {
  const errors: string[] = [];
  if (!formData.name?.trim()) errors.push("Name is required");
  if (!formData.email?.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
    errors.push("Valid email is required");
  if (!formData.subject?.trim()) errors.push("Subject is required");
  if (!formData.message?.trim()) errors.push("Message is required");
  return errors;
}

async function sendEmail(formData: ContactForm) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
    throw new Error(
      "Email transport credentials missing (GMAIL_USER/GMAIL_APP_PASS)"
    );
  }
  if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
    throw new Error("EMAIL_FROM and EMAIL_TO must be set");
  }

  const [mjmlReact, mjml, nodemailer, ContactModule] = await Promise.all([
    import("mjml-react"),
    import("mjml"),
    import("nodemailer"),
    import("@/emails/Contact"),
  ]);

  const Contact = ContactModule.default;

  // Render MJML React component to MJML markup
  const { renderToMjml } = mjmlReact;
  const mjmlMarkup = renderToMjml(
    React.createElement(Contact, {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    })
  );

  // Convert MJML -> HTML
  const { html, errors } = mjml.default(mjmlMarkup, {
    validationLevel: "soft",
  });
  if (errors && errors.length) {
    console.warn("MJML validation warnings", errors);
  }

  // Create transport (on-demand to avoid build-time fs scans)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    subject: formData.subject,
    html,
    text: `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`,
  });
}

export async function POST(request: Request) {
  try {
    const formData: ContactForm = await request.json();
    const errors = validate(formData);
    if (errors.length) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }
    await sendEmail(formData);
    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (e: any) {
    const devDetails =
      process.env.NODE_ENV !== "production" ? e?.message : undefined;
    return NextResponse.json(
      { message: "Error sending email.", error: devDetails },
      { status: 500 }
    );
  }
}

// Simple reachability test
export async function GET() {
  return NextResponse.json({ ok: true, route: "send-email" });
}
