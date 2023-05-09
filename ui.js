export class UI {
  constructor(
    searchUserInputElement,
    formElement,
    profileElement,
    alertsElement,
    loadingElement
  ) {
    this.searchUserInputElement = searchUserInputElement;
    this.formElement = formElement;
    this.profileElement = profileElement;
    this.alertsElement = alertsElement;
    this.loadingElement = loadingElement;
    this.searchUserInput = "";

    this.hideLoading();
  }

  onInputChange(callback) {
    this.searchUserInputElement.addEventListener("keyup", (event) => {
      this.searchUserInput = event.target.value.trim();
      if (callback) {
        callback(this.searchUserInput);
      }
    });
  }

  onFormSubmit(callback) {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      callback(this.searchUserInput);
    });
  }

  removeUserData() {
    this.profileElement.innerHTML = "";
  }

  renderUserData(user) {
    this.profileElement.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div class="repos"></div>
    `;
  }

  renderError(error) {
    const alert = document.createElement("div");
    alert.className = "alert alert-danger";
    alert.innerHTML = `<h4 class="alert-heading">${error.name}</h4><p>${error.message}</p>`;
    this.alertsElement.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 2000);
  }

  showLoading() {
    this.loadingElement.style.display = "block";
  }

  hideLoading() {
    this.loadingElement.style.display = "none";
  }
}
