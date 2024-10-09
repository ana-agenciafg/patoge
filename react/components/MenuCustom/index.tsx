import React, { useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import './style.css'

type SubmenuLink = {
  text: string;
  url: string;
  hasSubmenu?: boolean;
  submenuLinks?: SubmenuLink[];
  linkColor?: string;
  bold?: boolean;
};

type Banner = {
  bannerImage: string;
  bannerLink: string;
  bannerText: string;
};

type MenuLink = {
  __editorItemTitle?: string;
  text: string;
  url: string;
  hasSubmenu: boolean;
  submenuLinks?: SubmenuLink[];
  banners?: Banner[];
  linkColor?: string;
  bold?: boolean;
};

interface Props {
  menuLinks: MenuLink[];
}

const CSS_HANDLES = [
  "menuContainer",
  "submenuWrapper",
  "submenuTitleCol",
  "wrapper",
  "menuItem",
  "menuLink",
  "submenuContainer",
  "submenuItem",
  "bannerContainer",
  "bannerLink",
  "bannerText",
  "bannerImage",
  "submenuToggleIcon",
  "activeMenuItem",
  "hoverMenuItem",
  "container",
  "openSubmenu", 
] as const;

export const AstinoMenu = (props: Props) => {
  const { menuLinks } = props;
  console.log("menuLinks props:", menuLinks); // Verifique os dados recebidos

  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const { handles } = useCssHandles(CSS_HANDLES);

  const isMobile = window.innerWidth <= 768;

  const handleSubmenuToggle = (indexPath: string) => {
    setOpenSubmenus((prevOpenSubmenus) =>
      prevOpenSubmenus.includes(indexPath)
        ? prevOpenSubmenus.filter((path) => path !== indexPath)
        : [...prevOpenSubmenus, indexPath]
    );
  };

  const renderSubmenu = (
    submenuLinks: SubmenuLink[] | undefined,
    level: number = 0,
    parentIndexPath: string = ""
  ) => {
    if (!submenuLinks) return null;

    return (
      <ul 
        className={`${handles.submenuWrapper} level-${level} ${
          openSubmenus.includes(parentIndexPath) ? handles.openSubmenu : ""
        }`}
      >
        {submenuLinks.map((submenuLink, subIndex) => {
          const currentPath = `${parentIndexPath}-${subIndex}`;

          return (
            <li
              key={currentPath}
              className={`${handles.submenuItem} ${
                openSubmenus.includes(currentPath) ? handles.activeMenuItem : ""
              }`}
              onMouseEnter={() =>
                !isMobile &&
                setOpenSubmenus((prevOpenSubmenus) =>
                  prevOpenSubmenus.includes(currentPath)
                    ? prevOpenSubmenus
                    : [...prevOpenSubmenus, currentPath]
                )
              }
              onMouseLeave={() =>
                !isMobile &&
                setOpenSubmenus((prevOpenSubmenus) =>
                  prevOpenSubmenus.filter((path) => path !== currentPath)
                )
              }
            >
              {isMobile ? (
                <p
                  style={{ color: submenuLink.linkColor || "#1D1B1A" }}
                  className={handles.menuLink}
                  onClick={(e) => {
                    if (submenuLink.hasSubmenu) {
                      e.preventDefault();
                      handleSubmenuToggle(currentPath);
                    }
                  }}
                  aria-controls={`submenu-${currentPath}`}
                  aria-expanded={
                    openSubmenus.includes(currentPath) ? "true" : "false"
                  }
                >
                  {submenuLink.text}
                  {submenuLink.hasSubmenu && (
                    <span
                      className={`${handles.submenuToggleIcon} ${
                        openSubmenus.includes(currentPath) ? "active" : ""
                      }`}
                    />
                  )}
                </p>
              ) : (
                <a
                  href={submenuLink.url}
                  style={{ color: submenuLink.linkColor || "#1D1B1A" }}
                  className={`${submenuLink.text == "Ver tudo" ? "underline" : ""} ${handles.menuLink} ${submenuLink.bold ? "bold" : ""} ${level === 1 ? handles.submenuTitleCol : ""}`}
                >
                  {submenuLink.text}
                </a>
              )}
              {submenuLink.hasSubmenu &&
                renderSubmenu(submenuLink.submenuLinks, level + 1, currentPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav
      className={handles.menuContainer}
      role="navigation"
      aria-label="Main Menu"
    >
      <ul className={handles.wrapper}>
        {menuLinks.map((link, index) => {
          const indexPath = `${index}`;

          return (
            <li
              key={indexPath}
              className={`${handles.menuItem} ${
                openSubmenus.includes(indexPath) ? handles.activeMenuItem : ""
              } ${!isMobile ? handles.hoverMenuItem : ""} level-1`}
              onMouseEnter={() => !isMobile && setOpenSubmenus([indexPath])}
              onMouseLeave={() => !isMobile && setOpenSubmenus([])}
              aria-haspopup={link.hasSubmenu ? "true" : undefined}
              aria-expanded={
                openSubmenus.includes(indexPath) ? "true" : "false"
              }
            >
              {isMobile ? (
                <p
                  className={`${handles.menuLink} level-1`}
                  style={{ color: link.linkColor || "#1D1B1A" }}
                  onClick={(e) => {
                    if (link.hasSubmenu) {
                      e.preventDefault();
                      handleSubmenuToggle(indexPath);
                    }
                  }}
                  aria-controls={`submenu-${indexPath}`}
                  aria-expanded={
                    openSubmenus.includes(indexPath) ? "true" : "false"
                  }
                >
                  {link.text}
                  {link.hasSubmenu && (
                    <span
                      className={`${handles.submenuToggleIcon} ${
                        openSubmenus.includes(indexPath) ? "active" : ""
                      }`}
                    />
                  )}
                </p>
              ) : (
                <a
                  href={link.url}
                  className={`${handles.menuLink} ${link.bold ? "bold" : ""} level-1`}
                  style={{ color: link.linkColor || "#1D1B1A" }}
                >
                  {link.text}
                </a>
              )}
              {link.hasSubmenu && (
                <div
                  id={`submenu-${indexPath}`}
                  className={`${handles.submenuContainer} ${
                    openSubmenus.includes(indexPath) ? handles.openSubmenu : ""
                  }`}
                  role="region"
                  aria-label={`${link.text} submenu`}
                  style={{
                    display: openSubmenus.includes(indexPath) ? "flex" : "none",
                  }}
                >
                  {renderSubmenu(link.submenuLinks, 1, indexPath)}

                  {link.banners && link.banners.length > 0 && (
                    <div className={handles.bannerContainer}>
                      {link.banners.map((banner, bannerIndex) => {

                        return (
                          <a
                            className={handles.bannerLink}
                            key={bannerIndex}
                            href={banner.bannerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={banner.bannerImage}
                              alt={`Banner ${bannerIndex + 1}`}
                              className={handles.bannerImage}
                            />

                            {banner.bannerText && (
                              <span className={handles.bannerText}>
                                {banner.bannerText}
                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.0313L7.0026 7.01567L2 2" stroke="#1D1B1A" stroke-width="1.5" stroke-linecap="square"/></svg>
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

AstinoMenu.schema = {
  title: "Menu Customizado",
  description: "Um menu customizado com links dinâmicos e banners nos submenus",
  type: "object",
  properties: {
    menuLinks: {
      type: "array",
      title: "Links do Menu",
      items: {
        type: "object",
        properties: {
          __editorItemTitle: {
            type: "string",
            title: "Título no Editor",
          },
          text: {
            type: "string",
            title: "Texto do Link",
            default: "Link",
          },
          url: {
            type: "string",
            title: "URL do Link",
            default: "#",
          },
          bold: {
            type: "boolean",
            title: "Texto em negrito?",
            default: false,
          },
          hasSubmenu: {
            type: "boolean",
            title: "Este link possui um submenu?",
            default: false,
          },
          submenuLinks: {
            type: "array",
            title: "Coluna do Submenu",
            items: {
              type: "object",
              properties: {
                __editorItemTitle: {
                  type: "string",
                  title: "Título no Editor",
                },
                text: {
                  type: "string",
                  title: "Título da coluna",
                  default: "Submenu Link",
                },
                url: {
                  type: "string",
                  title: "URL do Link",
                  default: "#",
                },
                hasSubmenu: {
                  type: "boolean",
                  title: "Mostrar coluna?",
                  default: true,
                },
                submenuLinks: {
                  type: "array",
                  title: "Links do Submenu",
                  items: {
                    type: "object",
                    properties: {
                      text: {
                        type: "string",
                        title: "Texto do Link",
                        default: "Submenu Link",
                      },
                      url: {
                        type: "string",
                        title: "URL do Link",
                        default: "#",
                      },
                    },
                  },
                },
              },
            },
          },
          banners: {
            type: "array",
            title: "Banners",
            items: {
              type: "object",
              properties: {
                bannerImage: {
                  type: "string",
                  title: "URL da Imagem do Banner",
                  widget: {
                    "ui:widget": "image-uploader",
                  },
                  default: "",
                },
                bannerLink: {
                  type: "string",
                  title: "URL do Link do Banner",
                  default: "#",
                },
                bannerText: {
                  type: "string",
                  title: "Texto do banner",
                  default: "",
                },
              },
            },
          },
          linkColor: {
            type: "string",
            title: "Cor dos Links",
            default: "#1D1B1A",
            widget: {
              "ui:widget": "color",
            },
          },
        },
      },
      minItems: 1,
      addItemText: "Adicionar novo link",
      deleteItemText: "Remover link",
    },
  },
};
