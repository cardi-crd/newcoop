"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "../../components/ThemeContext";

export default function ContactPage() {
  // Example data (replace with your real info)
  const store = {
    id: "contact-location",
    name: "Coop by Cowpig",
    address: "429 N 4th Ave, Tucson, AZ 85713",
    hours: [
      "Friday: 11am - 10pm",
      "Saturday: 11am - 10pm",
      "Sunday: 11am - 5pm",
      "Monday: Closed",
      "Tuesday: 11am - 8pm",
      "Wednesday: 11am - 8pm",
      "Thursday: 11am - 8pm"
    ],
    phone: "+1 (520) 526-2385"
  };

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Job application form state
  const [jobForm, setJobForm] = useState({ 
    fullName: "", 
    phone: "", 
    email: "", 
    dateOfBirth: "",
    resume: null as File | null 
  });
  const [jobSubmitted, setJobSubmitted] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleJobFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'resume') {
      setJobForm({ ...jobForm, resume: e.target.files?.[0] || null });
    } else {
      setJobForm({ ...jobForm, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  }

  function handleJobSubmit(e: React.FormEvent) {
    e.preventDefault();
    setJobSubmitted(true);
    // Here you would send the job application data to your backend or email service
  }

  const { theme } = useTheme();
  const bgClass = theme === 'bagel' ? 'bg-[#46bafc]' : 'bg-black';
  const textClass = theme === 'bagel' ? 'text-black' : 'text-white';
  const cardBg = theme === 'bagel' ? 'bg-[#E7E4D4]' : 'bg-[#222]';
  
  return (
    <div className={`min-h-screen ${bgClass} flex flex-col items-center py-8 px-4 pb-32`}>
      
      {/* Coop Logo */}
      <div className="text-center pt-2 pb-6">
        <Link href="/" className="inline-block hover:scale-105 transition-transform duration-200 cursor-pointer">
          <Image
            src="/images/cooplogo.png"
            alt="Coop Logo - Click to go home"
            width={400}
            height={160}
            className="h-40 w-auto mx-auto"
            priority
          />
        </Link>
      </div>
      
      <h1 className={`text-5xl font-extrabold mb-6 font-['Irish_Grover',cursive] ${textClass}`}>Contact Us</h1>
      
      {/* Contact Information */}
      <div className={`${cardBg} rounded-3xl shadow-lg p-8 max-w-2xl w-full space-y-4 font-josefin ${textClass} mb-8`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold font-['Irish_Grover',cursive] text-red-700 mb-4">Get In Touch</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold font-['Irish_Grover',cursive] text-red-700">Phone</h3>
              <a href="tel:+1 (520) 526-2385" className="text-blue-700 underline text-lg">+1 (520) 526-2385</a>
            </div>
            <div>
              <h3 className="font-bold font-['Irish_Grover',cursive] text-red-700">Email</h3>
              <a href="mailto:thomas@coopxcowpig.com" className="text-blue-700 underline text-lg">thomas@coopxcowpig.com</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact form */}
      <form onSubmit={handleSubmit} className={`${cardBg} rounded-3xl shadow-lg p-8 max-w-2xl w-full flex flex-col gap-6 font-josefin ${textClass} mb-8`}>
        <h2 className="text-2xl font-bold font-['Irish_Grover',cursive] text-red-700 mb-2">Send Us a Message</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="rounded-lg border border-gray-300 px-4 py-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="rounded-lg border border-gray-300 px-4 py-3"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="rounded-lg border border-gray-300 px-4 py-3 min-h-[100px]"
        />
        <button
          type="submit"
          className="rounded-full bg-black text-[#E7E4D4] font-bold px-8 py-4 text-lg font-['Irish_Grover',cursive] hover:bg-skyline-red transition shadow"
        >
          {submitted ? "Message Sent!" : "Send Message"}
        </button>
      </form>

      {/* Job Application Section */}
      <div className={`${cardBg} rounded-3xl shadow-lg p-8 max-w-2xl w-full font-josefin ${textClass}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-['Irish_Grover',cursive] text-red-700 mb-2">Join Our Team</h2>
          <p className="text-sm">We're always looking for passionate people to join the Coop family!</p>
        </div>
        
        {!showJobForm ? (
          <button
            onClick={() => setShowJobForm(true)}
            className="w-full rounded-full bg-red-600 text-white font-bold px-8 py-4 text-lg font-['Irish_Grover',cursive] hover:bg-red-700 transition shadow"
          >
            Apply Now
          </button>
        ) : (
          <form onSubmit={handleJobSubmit} className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-['Irish_Grover',cursive] text-red-700">Job Application</h3>
              <button
                type="button"
                onClick={() => {
                  setShowJobForm(false);
                  setJobForm({ fullName: "", phone: "", email: "", dateOfBirth: "", resume: null });
                  setJobSubmitted(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={jobForm.fullName}
              onChange={handleJobFormChange}
              required
              className="rounded-lg border border-gray-300 px-4 py-3"
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={jobForm.phone}
              onChange={handleJobFormChange}
              required
              className="rounded-lg border border-gray-300 px-4 py-3"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={jobForm.email}
              onChange={handleJobFormChange}
              required
              className="rounded-lg border border-gray-300 px-4 py-3"
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={jobForm.dateOfBirth}
                onChange={handleJobFormChange}
                required
                className="rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resume/CV (optional)</label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleJobFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
            </div>
            
            <button
              type="submit"
              className="rounded-full bg-red-600 text-white font-bold px-8 py-4 text-lg font-['Irish_Grover',cursive] hover:bg-red-700 transition shadow"
            >
              {jobSubmitted ? "Application Submitted!" : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 