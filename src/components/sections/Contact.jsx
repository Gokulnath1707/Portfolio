// Contact.jsx — email link, socials, EmailJS form with validation + success/error states
import { useState, useRef } from 'react';
import { Mail, MapPin, Send, CheckCircle, XCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import emailjs from '@emailjs/browser';
import content from '../../data/content';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';

const { contact, meta } = content;

const INITIAL = { name: '', email: '', message: '' };

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Enter a valid email.';
  if (!fields.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function Contact() {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      await emailjs.send(
        contact.emailjs.serviceId,
        contact.emailjs.templateId,
        { from_name: fields.name, reply_to: fields.email, message: fields.message },
        { publicKey: contact.emailjs.publicKey }
      );
      setStatus('success');
      setFields(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border text-sm bg-bg text-ink placeholder:text-ink-muted
    outline-none transition-colors duration-150
    ${errors[field] ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-accent'}`;

  return (
    <SectionWrapper id="contact" className="bg-surface">
      <SectionHeading id="contact" label="Say hello" title="Get in Touch" />

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left — description + socials */}
        <div className="flex flex-col gap-6">
          <p className="text-base text-ink-muted leading-relaxed max-w-md">
            {contact.description}
          </p>

          <ul className="flex flex-col gap-4" role="list">
            <li>
              <a
                href={`mailto:${meta.email}`}
                className="inline-flex items-center gap-3 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                <Mail size={18} strokeWidth={1.75} className="text-accent" aria-hidden />
                {meta.email}
              </a>
            </li>
            <li>
              <a
                href={meta.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                <LinkedinIcon size={18} className="text-accent" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                <GithubIcon size={18} className="text-accent" />
                GitHub
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-3 text-sm text-ink-muted">
                <MapPin size={18} strokeWidth={1.75} className="text-accent" aria-hidden />
                {meta.location}
              </span>
            </li>
          </ul>
        </div>

        {/* Right — contact form */}
        <div>
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <CheckCircle size={40} className="text-green-500" strokeWidth={1.5} aria-hidden />
              <p className="font-semibold text-ink">Message sent!</p>
              <p className="text-sm text-ink-muted">I'll get back to you as soon as I can.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 text-sm text-accent hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wide">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  className={inputClass('name')}
                />
                {errors.name && <p id="err-name" role="alert" className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  className={inputClass('email')}
                />
                {errors.email && <p id="err-email" role="alert" className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <p id="err-message" role="alert" className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <div role="alert" className="flex items-center gap-2 text-sm text-red-500">
                  <XCircle size={16} aria-hidden />
                  Something went wrong. Please try emailing directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 py-3 rounded-lg
                  bg-accent text-white font-semibold text-sm
                  hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed
                  transition-colors duration-150"
              >
                {status === 'sending' ? 'Sending…' : (
                  <><Send size={15} aria-hidden /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
