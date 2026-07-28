'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { IconoWhatsApp } from '@/components/ui/Icons';
import { enlaceWhatsApp, mensajeCandidatura } from '@/lib/whatsapp';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
}

type Campo = 'nombre' | 'nacimiento' | 'posicion' | 'pie' | 'club' | 'pais' | 'video' | 'mensaje';

const VACIO: Record<Campo, string> = {
  nombre: '',
  nacimiento: '',
  posicion: '',
  pie: '',
  club: '',
  pais: '',
  video: '',
  mensaje: '',
};

export function FormularioCandidatura({ locale, dic }: Props) {
  const id = useId();
  const [valores, setValores] = useState<Record<Campo, string>>(VACIO);
  const [rgpd, setRgpd] = useState(false);
  const [errores, setErrores] = useState<Partial<Record<Campo, string>>>({});
  const [aviso, setAviso] = useState<{ texto: string; ok: boolean } | null>(null);
  const [enviando, setEnviando] = useState(false);

  const set = (campo: Campo) => (valor: string) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  /** Validación local: la misma que hace el servidor, para responder al instante. */
  function validar() {
    const e: Partial<Record<Campo, string>> = {};
    const anio = Number(valores.nacimiento);

    if (valores.nombre.trim().length < 3) e.nombre = dic.form.errores.nombre;
    if (!Number.isInteger(anio) || anio < 1975 || anio > 2016)
      e.nacimiento = dic.form.errores.nacimiento;
    if (!valores.posicion) e.posicion = dic.form.errores.posicion;
    if (!/^https?:\/\/\S+\.\S+/i.test(valores.video.trim())) e.video = dic.form.errores.video;

    return e;
  }

  async function enviar() {
    const e = validar();
    setErrores(e);

    if (Object.keys(e).length > 0) {
      setAviso({ texto: dic.form.errores.campos, ok: false });
      return;
    }
    if (!rgpd) {
      setAviso({ texto: dic.form.errores.rgpd, ok: false });
      return;
    }

    setAviso(null);
    setEnviando(true);

    const ficha = {
      nombre: valores.nombre.trim(),
      nacimiento: valores.nacimiento.trim(),
      posicion: valores.posicion,
      pie: valores.pie,
      club: valores.club.trim(),
      pais: valores.pais.trim(),
      video: valores.video.trim(),
      mensaje: valores.mensaje.trim(),
    };

    // El servidor valida y, si hay webhook configurado, deja constancia de la
    // candidatura. Aunque falle, el jugador puede seguir enviándola por WhatsApp.
    let avisoFinal = { texto: dic.form.ok, ok: true };
    try {
      const res = await fetch('/api/candidatura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ficha, rgpd: true, idioma: locale }),
      });
      if (!res.ok) avisoFinal = { texto: dic.form.errores.red, ok: false };
    } catch {
      avisoFinal = { texto: dic.form.errores.red, ok: false };
    }

    const texto = mensajeCandidatura(ficha, locale, dic);
    window.open(enlaceWhatsApp(texto), '_blank', 'noopener,noreferrer');

    setEnviando(false);
    setAviso(avisoFinal);
  }

  const campoProps = (campo: Campo) => ({
    id: `${id}-${campo}`,
    value: valores[campo],
    'aria-invalid': errores[campo] ? (true as const) : undefined,
    'aria-describedby': errores[campo] ? `${id}-${campo}-error` : undefined,
  });

  const mensajeError = (campo: Campo) =>
    errores[campo] ? (
      <span className="error-campo" id={`${id}-${campo}-error`}>
        {errores[campo]}
      </span>
    ) : null;

  return (
    <div className="campos">
      <div className={`campo${errores.nombre ? ' error' : ''}`}>
        <label htmlFor={`${id}-nombre`}>{dic.form.nombre}</label>
        <input
          {...campoProps('nombre')}
          type="text"
          autoComplete="name"
          onChange={(ev) => set('nombre')(ev.target.value)}
        />
        {mensajeError('nombre')}
      </div>

      <div className={`campo${errores.nacimiento ? ' error' : ''}`}>
        <label htmlFor={`${id}-nacimiento`}>{dic.form.nacimiento}</label>
        <input
          {...campoProps('nacimiento')}
          type="number"
          min={1975}
          max={2016}
          inputMode="numeric"
          placeholder="2006"
          onChange={(ev) => set('nacimiento')(ev.target.value)}
        />
        {mensajeError('nacimiento')}
      </div>

      <div className={`campo${errores.posicion ? ' error' : ''}`}>
        <label htmlFor={`${id}-posicion`}>{dic.form.posicion}</label>
        <select {...campoProps('posicion')} onChange={(ev) => set('posicion')(ev.target.value)}>
          <option value="">{dic.form.selecciona}</option>
          {Object.values(dic.form.posiciones).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {mensajeError('posicion')}
      </div>

      <div className="campo">
        <label htmlFor={`${id}-pie`}>{dic.form.pie}</label>
        <select {...campoProps('pie')} onChange={(ev) => set('pie')(ev.target.value)}>
          <option value="">{dic.form.selecciona}</option>
          {Object.values(dic.form.pies).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor={`${id}-club`}>{dic.form.club}</label>
        <input
          {...campoProps('club')}
          type="text"
          placeholder="—"
          onChange={(ev) => set('club')(ev.target.value)}
        />
      </div>

      <div className="campo">
        <label htmlFor={`${id}-pais`}>{dic.form.pais}</label>
        <input
          {...campoProps('pais')}
          type="text"
          placeholder="España"
          onChange={(ev) => set('pais')(ev.target.value)}
        />
      </div>

      <div className={`campo ancho${errores.video ? ' error' : ''}`}>
        <label htmlFor={`${id}-video`}>{dic.form.video}</label>
        <input
          {...campoProps('video')}
          type="url"
          placeholder="https://"
          onChange={(ev) => set('video')(ev.target.value)}
        />
        {mensajeError('video')}
      </div>

      <div className="campo ancho">
        <label htmlFor={`${id}-mensaje`}>{dic.form.mensaje}</label>
        <textarea
          {...campoProps('mensaje')}
          rows={3}
          onChange={(ev) => set('mensaje')(ev.target.value)}
        />
      </div>

      <label className="consent" htmlFor={`${id}-rgpd`}>
        <input
          id={`${id}-rgpd`}
          type="checkbox"
          checked={rgpd}
          onChange={(ev) => setRgpd(ev.target.checked)}
        />
        <span>
          {dic.form.rgpd}{' '}
          <Link href={href(locale, 'privacidad')}>{dic.form.rgpdEnlace}</Link>.
        </span>
      </label>

      <p className={`aviso${aviso?.ok ? ' ok' : ''}`} role="status" aria-live="polite">
        {aviso?.texto ?? ''}
      </p>

      <div className="campo ancho">
        <button
          className="btn btn-primario"
          type="button"
          style={{ width: '100%' }}
          onClick={enviar}
          disabled={enviando}
        >
          <IconoWhatsApp />
          <span>{enviando ? dic.form.enviando : dic.form.enviar}</span>
        </button>
      </div>
    </div>
  );
}
