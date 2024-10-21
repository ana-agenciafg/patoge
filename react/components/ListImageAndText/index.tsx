import React from 'react' 

export interface ImageAndTextProps {
  items: ImageAndTextPropsContent[];
}

interface ImageAndTextPropsContent { 
  image: string
  alt?: string
  link?: string
  openInNewTab?: boolean
  text?: string
  tagText?: keyof JSX.IntrinsicElements // Definir o tipo do tagText de acordo com os elementos HTML válidos
  width?: number
  height?: number
  loading?: "eager" | "lazy" 
}


export default function ImageAndText({ items }: ImageAndTextProps) {
  if (!items || items.length === 0) {
    return null; 
  }
  return (
    <>
      {items.map((item, index) => {
        const Tag = item.tagText || 'h2'  // Se não houver tagText, usa h2 por padrão
        const content = (
          <>
            <img 
              src={item.image}
              width={item.width || "auto"}
              height={item.height || "auto"}
              loading={item.loading || "eager"}
              alt={item.alt || item.text || ""}
              className="vtex-image-and-text-0-x-image" 
            />
            <div className="vtex-image-and-text-0-x-gradient"></div>
            {item.text && <Tag className="vtex-image-and-text-0-x-text">{item.text}</Tag>}
          </>
        )

        // Se houver link, envolver o conteúdo no <a>
        return (
          <div key={index} className="vtex-image-and-text-0-x-block">
            {item.link ? (
              <a 
                href={item.link} 
                target={item.openInNewTab ? "_blank" : "_self"} 
                rel={item.openInNewTab ? "noopener noreferrer" : ""}
              >
                {content}
              </a>
            ) : (
              content
            )}
          </div>
        )
      })}
    </>
  )
}
 

ImageAndText.schema = {
  title: 'Imagem e texto',
  description: 'Componente que exibe uma lista de itens com imagem e texto',
  type: 'object',
  properties: {
    items: {
      type: 'array',
      title: 'Itens de Imagem e Texto',
      items: {
        type: 'object',
        title: 'Item',
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
            default: '',
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
      },
    },
  },
}
