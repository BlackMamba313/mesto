export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._userName = name;
    this._userJob = job;
    this._avatar = avatar;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  getUserInfo() {
    const currentUserInfo = {};
    currentUserInfo.name = this._userName.textContent;
    currentUserInfo.job = this._userJob.textContent;
    currentUserInfo.avatar = this._avatar.src;
    return currentUserInfo;
  }
}
