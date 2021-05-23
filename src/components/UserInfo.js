export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const values = {
      userName: this._userNameElement.textContent,
      userJob: this._userJobElement.textContent,
    };
    return values;
  }

  setUserInfo(values) {
    this._userNameElement.textContent = values.userName;
    this._userJobElement.textContent = values.userJob;
  }
}
