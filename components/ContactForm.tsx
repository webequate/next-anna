// components/ContactForm.tsx
"use client";
import { useState } from "react";
import { ContactForm as ContactFormData } from "@/interfaces/ContactForm";
import Heading from "@/components/Heading";
import FormInput from "@/components/FormInput";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "submitting" }
    | { type: "success"; message: string }
    | { type: "error"; message: string; errors?: string[] }
  >({ type: "idle" });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus({ type: "submitting" });
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        const message = result.message || "Failed to send message.";
        setStatus({ type: "error", message, errors: result.errors });
        return;
      }

      setStatus({
        type: "success",
        message: result.message || "Message sent!",
      });
      // Reset form only on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });
    } catch (e: any) {
      setStatus({
        type: "error",
        message: "Unexpected error sending message.",
      });
    }
  };

  return (
    <div className="leading-loose">
      <form
        onSubmit={handleSubmit}
        className="bg-light-1 dark:bg-dark-1 rounded-xl text-left p-6 sm:p-8"
      >
        <Heading text="Contact Form" />
        <FormInput
          inputLabel="Full Name"
          labelFor="name"
          inputType="text"
          inputId="name"
          inputName="name"
          placeholderText="Your Name"
          ariaLabelName="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <FormInput
          inputLabel="Email"
          labelFor="email"
          inputType="email"
          inputId="email"
          inputName="email"
          placeholderText="Your Email"
          ariaLabelName="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <FormInput
          inputLabel="Subject"
          labelFor="subject"
          inputType="text"
          inputId="subject"
          inputName="subject"
          placeholderText="Subject"
          ariaLabelName="Subject"
          onChange={handleChange}
          value={formData.subject}
        />

        <div className="mb-4">
          <label
            className="block text-lg text-dark-2 dark:text-light-2 mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-full px-5 py-2 border text-dark-2 dark:text-light-2 bg-white dark:bg-black border-dark-2 dark:border-light-2 rounded-md shadow-sm text-md"
            id="message"
            name="message"
            cols={14}
            rows={6}
            aria-label="Message"
            onChange={handleChange}
            value={formData.message}
            required
          ></textarea>
        </div>

        {/* Honeypot field - hidden from humans, bots may fill it */}
        <input
          type="text"
          name="website"
          id="website"
          value={formData.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
          style={{ position: "absolute", left: "-9999px" }}
          aria-hidden="true"
        />

        <div className="mt-4 flex flex-col gap-4">
          <button
            type="submit"
            aria-label="Send Message"
            disabled={status.type === "submitting"}
            className="text-light-1 dark:text-light-1 bg-accent-dark dark:bg-accent-dark hover:bg-accent-light dark:hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed font-general-medium flex justify-center items-center w-40 sm:w-40 mb-2 text-lg py-2.5 sm:py-3 rounded-lg transition duration-300"
          >
            <span className="text-sm sm:text-lg">
              {status.type === "submitting" ? "Sending..." : "Send Message"}
            </span>
          </button>
          <div aria-live="polite" className="min-h-[1.25rem] text-sm">
            {status.type === "success" && (
              <p className="text-green-600 dark:text-green-400 font-medium">
                {status.message}
              </p>
            )}
            {status.type === "error" && (
              <div className="text-red-600 dark:text-red-400 space-y-1">
                <p className="font-medium">{status.message}</p>
                {status.errors?.length ? (
                  <ul className="list-disc list-inside text-red-600 dark:text-red-400">
                    {status.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
