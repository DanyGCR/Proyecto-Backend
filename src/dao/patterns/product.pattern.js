export class Product {
  constructor (title, description, code, price, status, stock, category, thumbnails) {
    this.title = title
    this.description = description
    this.code = code
    this.price = price
    this.status = status
    this.stock = stock
    this.category = category
    this.thumbnails = thumbnails
  }
}

export class ProductM extends Product {
  constructor (title, description, code, price, status, stock, category, thumbnails, id) {
    super(title, description, code, price, status, stock, category, thumbnails)
    this._id = id
  }
}
