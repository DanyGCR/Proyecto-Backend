import { api } from '../utils/api.js'

(() => {
  const $ = (item) => document.querySelector(`${item}`)

  const idProduct = window.location.pathname.split('/products/').join('')

  const apiCarts = `${api}/api/carts`
  const apiUser = `${api}/api/session/current`
  const apiProduct = `${api}/api/products/${idProduct}`

  const renderProductDetail = () => {
    const containerProductSDetail = $('#container-product-detail')

    fetch(apiUser)
      .then(data => data.json())
      .then(user => {
        if (user.status === 200) {
          fetch(apiProduct)
            .then(data => data.json())
            .then(data => {
              const { payload, status } = data
              if (status === 200) {
                containerProductSDetail.innerHTML = `
                  <h2 class="text-2xl font-extrabold"> ${payload.title} </h2>
        
                  <div class="w-full my-5 font-medium text-xl flex flex-col gap-3">
                    <p>
                      <span class="uppercase font-medium"> código: </span>
                      <span class="font-bold"> ${payload.code} </span>
                    </p>
                    <p>
                      <span class="uppercase font-medium"> precio: </span>
                      <span class="font-bold"> $${payload.price} </span>
                    </p>
                    <p>
                      <span class="uppercase font-medium"> estatus: </span>
                      <span class="font-bold"> ${payload.status} </span>
                    </p>
                    <p>
                      <span class="uppercase font-medium"> stock: </span>
                      <span class="font-bold"> ${payload.stock} </span>
                    </p>
                    <p>
                      <span class="uppercase font-medium"> categoria: </span>
                      <span class="font-bold"> ${payload.category} </span>
                    </p>
                  </div>
                  `
                const userAdmin = document.createElement('div')
                userAdmin.innerHTML = `
                  <button class="button-redirect-to-update bg-emerald-500 text-white py-2 px-4 font-bold rounded-md" id="${payload._id}">Actualizar producto</button>
                `
                const userUsuario = document.createElement('div')
                userUsuario.innerHTML = `
                  <button class="button-add-to-cart bg-emerald-500 text-white py-2 px-4 font-bold rounded-md" id="${payload._id}">Añadir al carrito</button>
                `
                if (user.payload.role === 'admin') {
                  containerProductSDetail.appendChild(userAdmin)
                } else if (user.payload.role === 'usuario') {
                  containerProductSDetail.appendChild(userUsuario)
                }
                cart(user.payload.cart, payload)
              }
            })
        }
      })
  }

  const cart = (idCart, product) => {
    const buttonAddToCart = $('.button-add-to-cart')
    const buttonRedirectToUpdate = $('.button-redirect-to-update')

    if (buttonRedirectToUpdate) {
      buttonRedirectToUpdate.addEventListener('click', e => {
        const idProducto = e.target.id
        window.location = `http://localhost:8080/products/${idProducto}/update`
      })
    }

    if (buttonAddToCart) {
      buttonAddToCart.addEventListener('click', e => {
        e.preventDefault()
        const idProduct = e.target.id
        fetch(`${apiCarts}/${idCart}`)
          .then(data => data.json())
          .then(data => {
            const addProductCart = () => {
              fetch(`${apiCarts}/${idCart}/product/${idProduct}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(data => data.json())
                .then(data => {
                  if (data.status === 200) {
                    alert('Product added to cart successfully')
                  }
                })
            }
            const { payload } = data
            const { products } = payload
            const item = products.find(item => item.product._id === idProduct)
            if (!item) addProductCart()
            else {
              if (product.stock <= item.quantity) {
                alert('Inventory stock limit has been exceeded')
              } else addProductCart()
            }
          })
      })
    }
  }

  renderProductDetail()
})()
