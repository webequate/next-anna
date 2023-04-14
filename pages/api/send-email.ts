// pages/api/send-email.ts

import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { ContactForm } from "@/interfaces/ContactForm";

async function sendEmail(formData: ContactForm) {
  const transporter = nodemailer.createTransport({
    service: "lmw2-bwfj.accessdomain.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: formData.subject,
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Message: ${formData.message}
    `,
  };

  await transporter.sendMail(mailOptions);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const formData: ContactForm = req.body;
      await sendEmail(formData);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error sending email." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
