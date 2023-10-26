export class UserRepository {
  constructor (dao) {
    this.dao = dao
  }

  signin (email, password) {
    const result = this.dao.signin(email, password)
    return result
  }

  getAll (page, limit) {
    const result = this.dao.getAll(page, limit)
    return result
  }

  getOne (email) {
    const result = this.dao.getOne(email)
    return result
  }

  create (obj) {
    const result = this.dao.create(obj)
    return result
  }

  update (email, obj) {
    const result = this.dao.update(email, obj)
    return result
  }

  delete (email) {
    const result = this.dao.delete(email)
    return result
  }
}
