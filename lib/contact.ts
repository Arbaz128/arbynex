// Single source of truth for how leads reach ARBYNEX.
// Used by the contact CTA, the lead form and the chat widget.

export const WHATSAPP_NUMBER = "923196926996";
export const EMAIL = "a4arbazchaudhary@gmail.com";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildEmailUrl(subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
