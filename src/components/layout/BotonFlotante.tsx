import { IconoWhatsApp } from '@/components/ui/Icons';
import { whatsappUrl } from '@/data/site';

export function BotonFlotante({ texto }: { texto: string }) {
  return (
    <a
      className="flotante"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <IconoWhatsApp />
      <span>{texto}</span>
    </a>
  );
}
