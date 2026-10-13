"use client";

import { useEffect, useId, useRef, useState } from "react";
import { enquiry } from "@/content/copy";
import { ui } from "@/content/ui";
import { Alert, Spinner } from "./icons";

/*
 * Enquiry form: the five supplied fields (contest copy §7), persistent labels, validation on
 * blur after first touch and on submit, an error summary, and a pending state.
 * There is no form handler in this prototype. A valid submission therefore says plainly that
 * nothing has been sent; it never shows a delivery success. The WordPress build replaces
 * `submitEnquiry` with the approved handler.
 */

type Values = { name: string; company: string; email: string; telephone: string; sites: string };
type Key = keyof Values;
type Errors = Partial<Record<Key, string>>;

const initial: Values = { name: "", company: "", email: "", telephone: "", sites: "" };
const labels = enquiry.fields;

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = ui.form.errors.name;
  if (!v.email.trim()) errors.email = ui.form.errors.email;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = ui.form.errors.emailFormat;
  if (v.telephone.trim() && !/^[+()\d\s-]{7,}$/.test(v.telephone.trim())) errors.telephone = ui.form.errors.telephone;
  return errors;
}

/** Submission seam: no endpoint is connected in this prototype. */
async function submitEnquiry(values: Values): Promise<{ sent: false }> {
  void values;
  return { sent: false };
}

export function EnquiryForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [notSent, setNotSent] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (notSent) statusRef.current?.focus();
  }, [notSent]);

  const visible = (all: Errors, t: typeof touched, s: boolean): Errors =>
    s ? all : Object.fromEntries(Object.entries(all).filter(([k]) => t[k as Key]));

  const update = (key: Key) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    setNotSent(false);
    if (submitted || touched[key]) setErrors(visible(validate(next), touched, submitted));
  };

  const blur = (key: Key) => () => {
    if (!values[key].trim() && !submitted) return; // never scold a field the visitor merely tabbed past
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
      setNotSent(false);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setPending(true);
    try {
      const result = await submitEnquiry(values);
      setNotSent(!result.sent);
    } finally {
      setPending(false);
    }
  };

  const field = (key: Key) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onChange: update(key),
    onBlur: blur(key),
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
  });

  const label = (key: Key, required = false) => (
    <label className="field__label" htmlFor={`${uid}-${key}`}>
      {labels[key]}
      {required ? <span className="field__req"> ({ui.form.required})</span> : null}
    </label>
  );

  const errorText = (key: Key) =>
    errors[key] ? (
      <p id={`${uid}-${key}-error`} className="field__error">
        <Alert size={16} className="mt-[3px] shrink-0" />
        {errors[key]}
      </p>
    ) : null;

  const errorList = Object.entries(errors) as [Key, string][];

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="enquiry-heading" aria-busy={pending} className="grid gap-5 sm:gap-6">
      {errorList.length ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-[var(--radius-control)] border-l-2 border-danger bg-danger/5 px-4 py-3.5 outline-none">
          <p className="text-[0.9375rem] font-semibold">{ui.form.summary(errorList.length)}</p>
          <ul className="mt-1.5 grid gap-1 text-[0.9375rem]">
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <a className="text-danger underline underline-offset-2" href={`#${uid}-${key}`}>
                  {labels[key]}: {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6">
        <div className="field">
          {label("name", true)}
          <input className="field__input" type="text" autoComplete="name" required {...field("name")} />
          {errorText("name")}
        </div>
        <div className="field">
          {label("company")}
          <input className="field__input" type="text" autoComplete="organization" {...field("company")} />
        </div>
        <div className="field">
          {label("email", true)}
          <input className="field__input" type="email" inputMode="email" autoComplete="email" spellCheck={false} required {...field("email")} />
          {errorText("email")}
        </div>
        <div className="field">
          {label("telephone")}
          <input className="field__input" type="tel" inputMode="tel" autoComplete="tel" {...field("telephone")} />
          {errorText("telephone")}
        </div>
      </div>

      <div className="field">
        {label("sites")}
        <textarea className="field__input" rows={5} {...field("sites")} />
      </div>

      <div className="grid gap-4">
        <button type="submit" className="btn btn-primary w-full sm:w-auto sm:justify-self-start" disabled={pending}>
          {pending ? <Spinner size={18} className="animate-spin" /> : null}
          {pending ? ui.form.sending : enquiry.submit}
        </button>
        {notSent ? (
          <p ref={statusRef} tabIndex={-1} role="status" className="t-caption rounded-[var(--radius-control)] bg-soft px-4 py-3 text-ink outline-none">
            {ui.form.notConnected}
          </p>
        ) : null}
      </div>
    </form>
  );
}
