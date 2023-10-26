import { api } from '../utils/api.js'

(() => {
  const $ = (item) => document.querySelector(`${item}`)

  const apiSession = `${api}/api/session/signup`

  const form = $('#form-signup')

  form.addEventListener('submit', e => {
    e.preventDefault()

    const user = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      age: form.age.value,
      email: form.email.value,
      password: form.password.value
    }

    fetch(apiSession, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(data => data.json())
      .then(data => {
        if (data.status === 200) window.location = '/products'
        if (data.status !== 200) {
          const { error } = data
          alert(error.message)
        }
      })
  })
})()
