class BlogService {
  _apiBase = 'https://kata.academy:8021/api/';
  //_apiKey = process.env.REACT_APP_KEY;

  async getArticles(page) {
    const offset = page === 1 ? 0 : page * 5;
    const res = await fetch(`${this._apiBase}articles?limit=5&offset=${offset}`);
    const result = await res.json();
    return result;
  }

  async getArticle(slug) {
    const res = await fetch(`${this._apiBase}articles/${slug}`);
    const result = await res.json();
    return result;
  }

  async createUser(data) {
    const res = await fetch(`${this._apiBase}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  }

  async loginUser(data) {
    const res = await fetch(`${this._apiBase}users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  }
  async getCurrentUser(token) {
    const res = await fetch(`${this._apiBase}user`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(),
    });
    const result = await res.json();
    return result;
  }
  async updateUser(data) {
    const res = await fetch(`${this._apiBase}user`, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${data.user.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  }
  /*async getProfile(username) {
    //неиспользован пока
    const res = await fetch(`${this._apiBase}profiles/${username}`);
    const result = await res.json();
    return result;
  }
*/
}

const blogService = new BlogService();
export default blogService;
