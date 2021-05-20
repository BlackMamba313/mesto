export default class UserInfo {
  constructor({userName, userJob}) {
    this._name = document.querySelector(userName);
    this._job = document.querySelector(userJob);
  }

  getUserInfo() {
    const values = {
      userName: this._name.textContent,
      userJob: this._job.textContent
    }
    return values;
  }

  setUserInfo(values) {
    this._name.textContent = values.userName;
    this._job.textContent = values.userJob;
  }
}