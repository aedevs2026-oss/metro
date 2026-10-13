"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, MessageSquare, Phone, Send, Tag, User } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { business } from "@/data/business";
import { openTrackedWhatsAppLead } from "@/lib/campaign-attribution";

const premiumInputClass =
  "w-full rounded-xl border border-[#e5e0d8] bg-[#f5f2ec] px-4 py-3.5 pl-11 text-sm text-foreground outline-none transition placeholder:text-body/45 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15";

const defaultInputClass =
  "w-full rounded-xl border border-[#e8e2da] bg-white/90 px-4 py-3.5 pl-11 text-sm text-foreground outline-none transition placeholder:text-body/45 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15";

export default function ContactForm({ variant = "default" }) {
  const premium = variant === "premium";
  const inputClass = premium ? premiumInputClass : defaultInputClass;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    city: "",
  });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  const whatsappMessage = `Hi ${business.shortName}, I have a website enquiry.\nName: ${form.name}\nPhone / WhatsApp: ${form.phone}\nEmail: ${form.email || "Not provided"}\nCity: ${form.city || "Not provided"}\nSubject: ${form.subject || "General enquiry"}\nMessage: ${form.message}`;

  function handleSubmit(event) {
    event.preventDefault();
    if (!consent) return;
    openTrackedWhatsAppLead({
      whatsappUrl: business.whatsappUrl,
      message: whatsappMessage,
      leadType: "contact_enquiry",
      leadDetails: {
        email: form.email,
        city: form.city,
        subject: form.subject || "General enquiry",
        message: form.message,
        submittedAt: new Date().toISOString(),
      },
      customer: { name: form.name, phone: form.phone, city: form.city, email: form.email },
      consent,
    });
    setSubmitted(true);
  }

  const shellClass = premium
    ? "h-full rounded-2xl border border-[#e8e2da] bg-white p-6 shadow-[0_14px_44px_rgba(17,24,39,0.07)] md:p-8 lg:p-9"
    : "space-y-4 rounded-3xl glass-card p-6";

  if (submitted) {
    return (
      <div className={shellClass}>
        <h3 className="font-heading text-xl font-semibold text-foreground">Thank you!</h3>
        <p className="mt-2 text-body">
          A WhatsApp draft has opened with your enquiry details. Tap Send inside WhatsApp to share it with our team. Email notifications are sent when SMTP is configured.
        </p>
        <div className="mt-5">
          <WhatsAppButton message={whatsappMessage} label="Send on WhatsApp" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={premium ? shellClass : `${shellClass} space-y-4`}>
      {premium ? (
        <div className="mb-6 border-b border-[#ebe6de] pb-6">
          <p className="section-eyebrow text-accent-dark">Send Us a Message</p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-foreground md:text-[1.75rem]">
            Enquiry Form
          </h2>
        </div>
      ) : null}

      <div className={premium ? "space-y-4" : ""}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
              Your Name <span className="text-accent-dark">*</span>
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/40"
                aria-hidden
              />
              <input
                id="name"
                name="name"
                required
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
              Phone Number <span className="text-accent-dark">*</span>
            </label>
            <div className="relative">
              <Phone
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/40"
                aria-hidden
              />
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/40"
              aria-hidden
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-foreground">
            City / Town
          </label>
          <div className="relative">
            <MapPin
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/40"
              aria-hidden
            />
            <input
              id="city"
              name="city"
              placeholder="Dharmapuri"
              value={form.city}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
            Subject
          </label>
          <div className="relative">
            <Tag
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/40"
              aria-hidden
            />
            <input
              id="subject"
              name="subject"
              placeholder="What can we help you with?"
              value={form.subject}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            Your Message
          </label>
          <div className="relative">
            <MessageSquare
              className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-body/40"
              aria-hidden
            />
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us about your space or product interest..."
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none pl-11`}
            />
          </div>
        </div>
      </div>

      <label className="flex items-start gap-2 text-xs leading-5 text-body">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 accent-[#b08c49]"
        />
        <span>I agree Metro Furniture may contact me about this enquiry by phone, email or WhatsApp.</span>
      </label>

      <button
        type="submit"
        className={`btn-pill-primary mt-6 inline-flex w-full justify-center gap-2 ${
          premium
            ? "py-3.5 text-sm"
            : "rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
        }`}
      >
        <Send className="h-4 w-4" aria-hidden />
        Send Enquiry
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
