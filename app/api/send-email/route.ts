import { NextResponse } from "next/server";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

// Ensure this route is always dynamic (no prerender) and uses the Node.js runtime
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function validate(formData: ContactForm) {
  const errors: string[] = [];
  // Honeypot check - if filled, it's likely a bot
  if (formData.website) {
    errors.push("Invalid submission detected");
    return errors;
  }
  if (!formData.name?.trim()) errors.push("Name is required");
  if (!formData.email?.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
    errors.push("Valid email is required");
  if (!formData.subject?.trim()) errors.push("Subject is required");
  if (!formData.message?.trim()) errors.push("Message is required");
  return errors;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

async function sendEmail(formData: ContactForm) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
    throw new Error(
      "Email transport credentials missing (GMAIL_USER/GMAIL_APP_PASS)"
    );
  }
  if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
    throw new Error("EMAIL_FROM and EMAIL_TO must be set");
  }

  const nodemailer = await import("nodemailer");

  const safeName = escapeHtml(formData.name.trim());
  const safeEmail = escapeHtml(formData.email.trim());
  const safeSubject = escapeHtml(formData.subject.trim());
  const safeMessage = escapeHtml(formData.message.trim()).replace(
    /\n/g,
    "<br/>"
  );

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://annaelisejohnson.com";
  const webEquateUrl = "https://webequate.com";
  const reachOutMailto =
    "mailto:webequate@gmail.com?subject=Contact%20Form%20Email%20Help%3A%20AnnaEliseJohnson.com";
  const logoUrl = `${siteUrl}/assets/logo-webequate-light.png`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Form Submission</title>
  </head>
  <body style="margin:0;padding:24px;background:#0b0b0b;color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#111;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:24px;border-bottom:1px solid #1f1f1f;background:#0f0f0f;">
                <a href="${webEquateUrl}" style="display:inline-block;text-decoration:none;">
                  <img src="${logoUrl}" alt="WebEquate" width="200" style="display:block;border:0;outline:none;" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;font-size:20px;font-weight:700;letter-spacing:0.2px;">
                New website contact form submission
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;font-size:14px;color:#cfcfcf;">
                <div style="margin-bottom:12px;">
                  <strong style="color:#8bd3ff;">Website:</strong>
                  <a href="${siteUrl}" style="color:#8bd3ff;text-decoration:none;">AnnaEliseJohnson.com</a>
                </div>
                <div style="margin-bottom:8px;"><strong style="color:#8bd3ff;">Name:</strong> ${safeName}</div>
                <div style="margin-bottom:8px;"><strong style="color:#8bd3ff;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#8bd3ff;text-decoration:none;">${safeEmail}</a></div>
                <div style="margin-bottom:8px;"><strong style="color:#8bd3ff;">Subject:</strong> ${safeSubject}</div>
                <div style="margin-top:16px;"><strong style="color:#8bd3ff;">Message:</strong></div>
                <div style="margin-top:8px;line-height:1.6;">${safeMessage}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px 24px 24px;border-top:1px solid #1f1f1f;font-size:12px;color:#9b9b9b;">
                Need help? <a href="${reachOutMailto}" style="color:#8bd3ff;text-decoration:none;">Reach out</a> anytime.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

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
