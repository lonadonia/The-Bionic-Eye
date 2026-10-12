"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cta, support } from "@/content/copy";
import { ui } from "@/content/ui";
import { Alert, Check, Spinner } from "./icons";
import { INTEREST_EVENT } from "./service-link";

/*
 * Enquiry form — DESIGN PREVIEW.
 * Field set and labels are proposals pending client approval (the brief supplies none).
 * No backend is connected: submission validates in the browser and shows a clearly labelled
 * preview state. Nothing is transmitted or stored.
 */

type Values = { name: string; company: string; email: string; phone: string; interest: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: "", company: "", email: "", phone: "", interest: "demonstration", message: "" };

const interestOptions = [
  { value: "demonstration", label: cta.label },
  ...support.services.map((s) => ({ value: s.id, label: s.title })),
];

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Enter your name.";
  if (!v.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = "Enter an email address in the format name@company.co.uk.";
  if (v.phone.trim() && !/^[+()\d\s-]{7,}$/.test(v.phone.trim())) errors.phone = "Enter a phone number using digits, spaces and + only.";
  return errors;
}

/**
 * Submission seam. The preview resolves locally and sends nothing; the WordPress build replaces this
 * with the approved form handler. The pending state below is already wired for a real request.
 */
async function submitEnquiry(values: Values): Promise<void> {
  void values;
}

export function EnquiryForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // Service links elsewhere on the page pre-select the matching interest.
  useEffect(() => {
    const onInterest = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (interestOptions.some((o) => o.value === id)) {
        setDone(false);
        setValues((v) => ({ ...v, interest: id }));
      }
    };
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  // Errors show for fields the visitor has left (or for every field after a submit attempt).
  const visible = (all: Errors, t: typeof touched, s: boolean): Errors =>
    s ? all : Object.fromEntries(Object.entries(all).filter(([k]) => t[k as keyof Values]));

  const update = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (submitted || touched[key]) setErrors(visible(validate(next), touched, submitted));
  };

  const blur = (key: keyof Values) => () => {
    if (!values[key].trim() && !submitted) return; // don't scold an empty field the visitor merely tabbed past
    const t = { ...touched, [key]: true };
    setTouched(t);
    setErrors(visible(validate(values), t, submitted));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setPending(true);
    try {
      await submitEnquiry(values);
      setDone(true);
    } finally {
      setPending(false);
    }
  };

  const field = (key: keyof Values) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onChange: update(key),
    onBlur: blur(key),
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
  });

  const errorText = (key: keyof Values) =>
    errors[key] ? (
      <p id={`${uid}-${key}-error`} className="field__error">
        <Alert size={16} className="mt-px shrink-0" />
        {errors[key]}
      </p>
    ) : null;

  const errorList = Object.entries(errors) as [keyof Values, string][];

  if (done) {
    const chosen = interestOptions.find((o) => o.value === values.interest)?.label;
    return (
      <div ref={doneRef} tabIndex={-1} className="grid gap-5 outline-none" role="status">
        <p className="chip text-slate">Design preview</p>
        <p className="flex items-center gap-3 font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.02em]">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-signal-strong text-white">
            <Check size={18} />
          </span>
          Form validated — nothing has been sent.
        </p>
        <p className="t-body text-slate">
          This preview has no live connection. In the WordPress build this request ({chosen}) will be routed to The Bionic Eye
          through the approved form handler.
        </p>
        <button
          type="button"
          className="btn btn-secondary w-fit"
          onClick={() => {
            setValues(initial);
            setErrors({});
            setTouched({});
            setSubmitted(false);
            setDone(false);
          }}
        >
          Start again
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`} aria-busy={pending} className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id={`${uid}-title`} className="t-h3">
          {cta.label}
        </h3>
        <p className="chip text-slate">Proposed fields, pending approval</p>
      </div>

      {errorList.length ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-[2px] border-l-2 border-danger bg-danger/5 px-4 py-3.5 outline-none">
          <p className="font-display text-[0.9375rem] font-semibold">
            Check {errorList.length === 1 ? "this field" : `these ${errorList.length} fields`}:
          </p>
          <ul className="mt-1.5 grid gap-1 text-[0.9375rem]">
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <a className="link text-danger" href={`#${uid}-${key}`}>
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-name`}>
            Name <span className="field__req">(required)</span>
          </label>
          <input className="field__input" type="text" autoComplete="name" required {...field("name")} />
          {errorText("name")}
        </div>
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-company`}>
            Company
          </label>
          <input className="field__input" type="text" autoComplete="organization" {...field("company")} />
        </div>
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-email`}>
            Email <span className="field__req">(required)</span>
          </label>
          <input
            className="field__input"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            {...field("email")}
          />
          {errorText("email")}
        </div>
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-phone`}>
            Phone
          </label>
          <input className="field__input" type="tel" inputMode="tel" autoComplete="tel" {...field("phone")} />
          {errorText("phone")}
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor={`${uid}-interest`}>
          Interested in
        </label>
        <select
          className="field__input appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23111719' stroke-width='1.5'/%3E%3C/svg%3E\")",
          }}
          {...field("interest")}
        >
          {interestOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor={`${uid}-message`}>
          Message
        </label>
        <textarea className="field__input min-h-[7.5rem] resize-y" rows={4} {...field("message")} />
      </div>

      <div className="grid gap-3 border-t border-line pt-5">
        <button type="submit" className="btn btn-primary btn-lg w-full sm:w-auto sm:justify-self-start" aria-busy={pending} disabled={pending}>
          {pending ? <Spinner size={18} className="animate-spin" /> : null}
          {pending ? ui.form.sending : cta.label}
        </button>
        <p className="t-meta text-slate">
          Design preview: this form validates input but does not send or store any data. Privacy notice wording pending
          client approval.
        </p>
      </div>
    </form>
  );
}
