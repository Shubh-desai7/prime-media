import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      className="wa"
      href={whatsappLink("Hi Prime Media! I'd like to check availability for my event.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-2c1.8 1 3.8 1.5 5.6 1.5 7 0 12.6-5.600 12.600-12.500S23 3 16 3zm0 22.800c-1.800 0-3.600-.5-5.100-1.400l-.4-.2-4.400 1.200 1.200-4.300-.3-.4a10.200 10.200 0 0 1-1.600-5.500C5.400 9.700 10.100 5.200 16 5.200S26.600 9.700 26.600 15.500 21.800 25.800 16 25.800zm5.800-7.600c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100a8.500 8.500 0 0 1-4.200-3.700c-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400s-1.200 1.200-1.200 2.900 1.200 3.300 1.400 3.500 2.400 3.700 5.800 5.200c2.100.9 2.900 1 3.900.8.600-.1 1.900-.8 2.100-1.500s.3-1.400.2-1.500-.3-.3-.6-.4z"/></svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
}
