import React, {  useState,useRef } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { newsletterFactory } from '../NewsletterFactory'
import './style.css'

export const HANDLES_POPUPNEWSLETTER = [
  'newsletterform',
  'newsletterform__image',
  'newsletterform__close',
  'newsletterform__form', 
  'newsletterform__formSubtitle',
  'newsletterform__formInputEmail',
  'newsletterform__formInputName',
  'newsletterform__formSubmit',
  'newsletterform__success',
  'newsletterform__aviso'
] as const

export function NewsletterForm() {
  const { handles } = useCssHandles(HANDLES_POPUPNEWSLETTER)
  const [data, setData] = useState({
    success: false,
  })
  const submitButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const newsletterData = {
      nome: form.get('name') as string,
      email: form.get('email') as string, 
    }


    const newsletter = newsletterFactory()
    newsletter.send(newsletterData).then(function () {
    setData(() => ({ ...data, success: true }))
    })

  }

  return (
    <div
      className={applyModifiers(
        handles.newsletterform,
        data.success ? 'success' : ''
      )}
    > 
      <form className={handles.newsletterform__form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="SEU NOME"
          aria-label="SEU NOME"
          required
          className={handles.newsletterform__formInputName}
        />
        <input
          type="email"
          name="email"
          placeholder="SEU E-MAIL"
          aria-label="SEU E-MAIL"
          required
          className={handles.newsletterform__formInputEmail}
        />
        <button
          className={handles.newsletterform__formSubmit} 
          type="submit"
          onClick={() => (submitButtonRef.current = document.activeElement as HTMLButtonElement)}
        >
          ASSINAR
        </button>  
        <p className={handles.newsletterform__aviso}>Ao assinar você concorda com nossos <a href="">Termos de Uso</a> e <a href="">Políticas de Privacidade</a>.</p>
      </form>
      <div className={handles.newsletterform__success}>Cadastrado com sucesso</div>
    </div>
  )
}
