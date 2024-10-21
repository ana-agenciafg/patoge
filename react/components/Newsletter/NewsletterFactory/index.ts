// import { slugify } from '../../utils/slugify'

export type newsletterData = {
  nome: string
  email: string 
}

export const newsletterFactory = function () {
  return {
    send: (data: newsletterData) => {
      if (!data) {
        throw Error('Data not defined to newsletterFactory')
      }

      return new Promise(function (resolve) {
        // const emailSlug = slugify(data.email)
        const url = `/api/dataentities/NL/search?email=${data.email}`

        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.vtex.ds.v10+json',
                      'Content-Type': 'application/json',
          },
        }).then((response)=>{
          return response.json()
        }).then((r)=>{
          if(r.length){
            console.log('existe')
          }else{
            console.log('não existe')
            console.log(data,'data')
            fetch(`/api/dataentities/NL/documents`, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                Accept: 'application/vnd.vtex.ds.v10+json',
                          'Content-Type': 'application/json',
              },
            }).then(() => {
              // Se bem-sucedido, mostrar o elemento de sucesso
              const successElement = document.querySelector('.patoge-patoge-0-x-newsletterform__success') as HTMLElement;
              if (successElement) {
                successElement.style.display = 'block';
              }
            })
          }
          return resolve(true)
        })
      })
    },
  }
}
