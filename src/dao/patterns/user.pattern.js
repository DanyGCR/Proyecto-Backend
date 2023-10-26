export class User {
  constructor (first_name, last_name, email, age, password, cart, role) {
    this.fullname = first_name + ' ' + last_name
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.age = age
    this.password = password
    this.cart = cart
    this.role = role
  }
}

export class UserM extends User {
  constructor (first_name, last_name, email, age, password, cart, role, id) {
    super(first_name, last_name, email, age, password, cart, role)
    this._id = id
  }
}
