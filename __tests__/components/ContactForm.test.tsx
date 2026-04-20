import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

vi.mock("@/components/Heading", () => ({
  default: ({ text }: { text: string }) => <h1>{text}</h1>,
}));

vi.mock("@/components/FormInput", () => ({
  default: ({
    inputLabel,
    inputId,
    inputName,
    inputType,
    onChange,
    value,
  }: any) => (
    <div>
      <label htmlFor={inputId}>{inputLabel}</label>
      <input
        id={inputId}
        name={inputName}
        type={inputType}
        onChange={onChange}
        value={value}
      />
    </div>
  ),
}));

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
  await user.type(screen.getByLabelText("Email"), "jane@example.com");
  await user.type(screen.getByLabelText("Subject"), "Hello");
  await user.type(screen.getByLabelText("Message"), "Test message body");
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("ContactForm", () => {
  it("renders form fields and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("honeypot field is present but hidden", () => {
    render(<ContactForm />);
    const honeypot = document.getElementById("website") as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    expect(honeypot.style.left).toBe("-9999px");
    expect(honeypot.getAttribute("aria-hidden")).toBe("true");
  });

  it("shows 'Sending...' while submitting", async () => {
    const user = userEvent.setup();
    let resolvePromise: (v: Response) => void;
    global.fetch = vi.fn(
      () => new Promise((res) => { resolvePromise = res; })
    ) as any;

    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("button")).toHaveTextContent("Sending...");
    expect(screen.getByRole("button")).toBeDisabled();

    resolvePromise!(new Response(JSON.stringify({ message: "Sent!" }), { status: 200 }));
  });

  it("shows success message and resets form on 200 response", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Message sent!" }), { status: 200 })
    ) as any;

    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByText("Message sent!")).toBeInTheDocument()
    );
    expect(screen.getByLabelText("Full Name")).toHaveValue("");
  });

  it("shows error message on non-ok response", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ message: "Validation failed.", errors: ["Name is required."] }),
        { status: 422 }
      )
    ) as any;

    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByText("Validation failed.")).toBeInTheDocument()
    );
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
  });

  it("shows generic error on fetch exception", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error")) as any;

    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(
        screen.getByText("Unexpected error sending message.")
      ).toBeInTheDocument()
    );
  });

  it("sends form data as JSON in request body", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "ok" }), { status: 200 })
    ) as any;

    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const [, options] = (global.fetch as any).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.name).toBe("Jane Doe");
    expect(body.email).toBe("jane@example.com");
  });
});
