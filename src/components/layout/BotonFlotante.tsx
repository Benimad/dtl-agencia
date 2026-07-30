import { IconoWhatsApp } from '@/components/ui/Icons';

export function BotonFlotante({
  texto,
  whatsappUrl,
}: {
  texto: string;
  whatsappUrl: string;
}) {
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
