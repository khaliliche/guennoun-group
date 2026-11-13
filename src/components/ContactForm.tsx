"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { company, formEndpoint, type Locale } from "@/content/site";
import type { Dict } from "@/content/fr";

type FieldKey = "name" | "company" | "email" | "phone" | "category" | "message" | "consent";
type Errors = Partial<Record<FieldKey, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed" }
  | { kind: "mailto"; body: string; href: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm({ locale, t }: { locale: Locale; t: Dict["contactPage"] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [category, setCategory] = useState("");
  const [copied, setCopied] = useState(false);

  // Présélection de la catégorie « partenariat » depuis les boutons d'appel à l'action
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("category") === "partnership") {
      setCategory("partnership");
    }
  }, []);

  const f = t.fields;

  function validate(values: Record<string, string | boolean>): Errors {
    const e: Errors = {};
    const s = (k: string) => String(values[k] ?? "").trim();
    if (!s("name")) e.name = t.errors.required;
    if (!s("company")) e.company = t.errors.required;
    if (!s("email")) e.email = t.errors.required;
    else if (!EMAIL_RE.test(s("email"))) e.email = t.errors.email;
    if (s("phone")) {
      const digits = s("phone").replace(/\D/g, "");
      if (!/^[+()\d\s.-]+$/.test(s("phone")) || digits.length < 6 || digits.length > 15) e.phone = t.errors.phone;
    }
    if (!s("category")) e.category = t.errors.required;
    if (!s("message")) e.message = t.errors.required;
    else if (s("message").length < 20) e.message = t.errors.message;
    if (!values.consent) e.consent = t.errors.consent;
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const values: Record<string, string | boolean> = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      role: String(data.get("role") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      category: String(data.get("category") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
    };

    // Champ piège anti-robots : on ne fait rien si rempli
    if (String(data.get("website") ?? "")) return;

    const found = validate(values);
    setErrors(found);
    setCopied(false);
    const firstInvalid = (Object.keys(found) as FieldKey[])[0];
    if (firstInvalid) {
      setStatus({ kind: "idle" });
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const categoryLabel =
      t.categories[values.category as "partnership" | "request" | "other"] ?? String(values.category);
    const payload = {
      locale,
      name: values.name,
      company: values.company,
      role: values.role,
      email: values.email,
      phone: values.phone,
      category: values.category,
      message: values.message,
    };

    // Cas 1 : un service de réception est configuré → envoi réel, confirmé seulement si le service répond OK
    if (formEndpoint) {
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus({ kind: "sent" });
        form.reset();
        setCategory("");
      } catch {
        setStatus({ kind: "failed" });
      }
      queueMicrotask(() => statusRef.current?.focus());
      return;
    }

    // Cas 2 : aucun service configuré → on prépare un e-mail dans l'application du visiteur.
    // On ne prétend JAMAIS que la demande a été envoyée.
    const m = t.mailFields;
    const lines = [
      `${m.name} : ${values.name}`,
      `${m.company} : ${values.company}`,
      values.role ? `${m.role} : ${values.role}` : "",
      `${m.email} : ${values.email}`,
      values.phone ? `${m.phone} : ${values.phone}` : "",
      `${m.category} : ${categoryLabel}`,
      "",
      `${m.message} :`,
      String(values.message),
    ].filter((l, i, arr) => l !== "" || (i > 0 && arr[i - 1] !== ""));
    const body = lines.join("\n");
    const href = `mailto:${company.email}?subject=${encodeURIComponent(t.status.mailSubject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "mailto", body, href });
    queueMicrotask(() => statusRef.current?.focus());
    window.location.href = href;
  }

  async function copy(body: string) {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const hasErrors = Object.keys(errors).length > 0;
  const err = (k: FieldKey) => errors[k];
  const describe = (k: FieldKey) => (err(k) ? `${k}-error` : undefined);

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <div>
        <h2 className="form__title" id="form-title">
          {t.formTitle}
        </h2>
        <p style={{ marginTop: 12, color: "var(--slate)", fontSize: "0.9375rem" }}>{t.formIntro}</p>
      </div>

      {hasErrors && (
        <div className="alert alert--error" role="alert">
          {t.errors.summary}
        </div>
      )}

      <div className="form__row">
        <div className="field">
          <label htmlFor="name">
            {f.name}
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <input id="name" name="name" className="input" type="text" autoComplete="name" required aria-required="true" aria-invalid={!!err("name")} aria-describedby={describe("name")} />
          {err("name") && (
            <p className="field-error" id="name-error">
              {err("name")}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="company">
            {f.company}
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <input id="company" name="company" className="input" type="text" autoComplete="organization" required aria-required="true" aria-invalid={!!err("company")} aria-describedby={describe("company")} />
          {err("company") && (
            <p className="field-error" id="company-error">
              {err("company")}
            </p>
          )}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="role">
            {f.role}
            <span className="opt">({f.optional})</span>
          </label>
          <input id="role" name="role" className="input" type="text" autoComplete="organization-title" />
        </div>
        <div className="field">
          <label htmlFor="phone">
            {f.phone}
            <span className="opt">({f.optional})</span>
          </label>
          <input id="phone" name="phone" className="input ltr" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!err("phone")} aria-describedby={describe("phone")} />
          {err("phone") && (
            <p className="field-error" id="phone-error">
              {err("phone")}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">
          {f.email}
          <span className="req" aria-hidden="true">
            *
          </span>
        </label>
        <input id="email" name="email" className="input ltr" type="email" autoComplete="email" required aria-required="true" aria-invalid={!!err("email")} aria-describedby={describe("email")} />
        {err("email") && (
          <p className="field-error" id="email-error">
            {err("email")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="category">
          {f.category}
          <span className="req" aria-hidden="true">
            *
          </span>
        </label>
        <select id="category" name="category" className="select" value={category} onChange={(e) => setCategory(e.target.value)} required aria-required="true" aria-invalid={!!err("category")} aria-describedby={describe("category")}>
          <option value="" disabled>
            {t.categories.placeholder}
          </option>
          <option value="partnership">{t.categories.partnership}</option>
          <option value="request">{t.categories.request}</option>
          <option value="other">{t.categories.other}</option>
        </select>
        {err("category") && (
          <p className="field-error" id="category-error">
            {err("category")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">
          {f.message}
          <span className="req" aria-hidden="true">
            *
          </span>
        </label>
        <textarea id="message" name="message" className="textarea" required aria-required="true" aria-invalid={!!err("message")} aria-describedby={describe("message")} />
        {err("message") && (
          <p className="field-error" id="message-error">
            {err("message")}
          </p>
        )}
      </div>

      <div className="field">
        <div className="check">
          <input id="consent" name="consent" type="checkbox" aria-invalid={!!err("consent")} aria-describedby={describe("consent")} />
          <label htmlFor="consent">
            {f.consent}
            <span className="req" aria-hidden="true">
              {" "}
              *
            </span>
          </label>
        </div>
        {err("consent") && (
          <p className="field-error" id="consent-error">
            {err("consent")}
          </p>
        )}
      </div>

      {/* Champ piège (invisible pour les humains) */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button type="submit" className="btn btn--solid-navy" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? t.submitting : t.submit}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" style={{ outline: "none" }}>
        {status.kind === "sent" && <div className="alert alert--success">{t.status.sent}</div>}
        {status.kind === "failed" && (
          <div className="alert alert--error">
            {t.status.failed}{" "}
            <a className="inline ltr" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
        )}
        {status.kind === "mailto" && (
          <div className="alert alert--info">
            <strong>{t.status.mailtoTitle}</strong>
            {t.status.mailtoText}{" "}
            <a className="inline ltr" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <pre>{status.body}</pre>
            <button type="button" className="btn btn--outline btn--sm" onClick={() => copy(status.body)}>
              {copied ? t.status.copied : t.status.copy}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
