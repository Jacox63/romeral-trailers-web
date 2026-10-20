type IconProps = { className?: string };

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
      <path d="M0 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Icono genérico de conversación (no reproduce el logotipo de WhatsApp). */
export function ChatIcon({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 19.5 5.3 15A8 8 0 1 1 9 18.7L4 19.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 10.5h6M9 13.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ChevronLeft({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 4 6.5 10l6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ChevronRight({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m7.5 4 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
