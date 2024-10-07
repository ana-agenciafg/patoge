import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface ImageAndTextProps {
  image: string
  alt?: string
  link?: string
  openInNewTab?: boolean
  text?: string
  tagText?: keyof JSX.IntrinsicElements // Definir o tipo do tagText de acordo com os elementos HTML válidos
  width?: number
  height?: number
  loading?:  "eager" | "lazy" 
}

const CSS_HANDLES = ['block','gradient', 'image', 'text'] as const

const ImageAndText = ({ 
  image,
  alt,
  link,
  openInNewTab = false,
  text,
  tagText = 'h2',  // Se não houver tagText, usa h2 por padrão
  width,
  height,
  loading = "eager"
}: ImageAndTextProps) => {
    const { handles } = useCssHandles(CSS_HANDLES);

  const Tag = tagText  // Garantindo que o tagText seja um elemento válido

  const content = (
    <>
      <img 
        src={image}
        width={width || "auto"}
        height={height || "auto"}
        loading={loading || "eager"}
        alt={alt || text || ""}
        className={handles.image} 
      />
      <div className={handles.gradient}></div>
      {text && <Tag className={handles.text}>{text}</Tag> }
    </>
  )

  // Se houver link, envolver o conteúdo no <a>
  return (
    <div className={handles.block}>
      {link ? (
        <a 
          href={link} 
          target={openInNewTab ? "_blank" : "_self"} 
          rel={openInNewTab ? "noopener noreferrer" : ""}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}

export default ImageAndText

ImageAndText.schema = {
  title: 'Imagem e texto',
  description: 'Componente com imagem e texto editáveis',
  type: 'object',
  properties: {
    image: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    alt: {
      title: 'Alt da Imagem',
      type: 'string',
      default: '',
    },
    link: {
      title: 'Link',
      type: 'string',
      default: '',
    },
    openInNewTab: {
      title: 'Abrir em uma nova aba?',
      type: 'boolean',
      default: false,
    },
    text: {
      title: 'Texto',
      type: 'string',
    },
    tagText: {
      title: 'Tag do Texto',
      type: 'string',
      enum: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      enumNames: ['Título H2', 'Título H3', 'Título H4', 'Título H5', 'Título H6', 'Parágrafo'],
      widget: { 'ui:widget': 'select' },
    },
    width: {
      title: 'Largura da Imagem',
      type: 'number',
      default: null,
    },
    height: {
      title: 'Altura da Imagem',
      type: 'number',
      default: null,
    },
    loading: {
      title: 'Carregamento da Imagem',
      type: 'string',
      enum: ['eager', 'lazy'],
      enumNames: ['Carregamento Imediato', 'Carregamento Lento'],
      default: 'eager',
    } 
  },
}
