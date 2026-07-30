import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/brand/logo.jpg';

export function MarcaAdmin({ href, lema = 'Panel de gestión' }: { href: string; lema?: string }) {
  return (
    <Link className="admin-marca" href={href}>
      <Image src={logo} alt="DTL Agencia" width={40} height={40} />
      <span>
        <b>
          DTL
          <br />
          Agencia
        </b>
        <small>{lema}</small>
      </span>
    </Link>
  );
}
