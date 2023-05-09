export class UI {
  constructor(
    searchUserInputElement,
    formElement,
    profileElement,
    alertsElement,
    loadingElement,
    reposElement
  ) {
    this.searchUserInputElement = searchUserInputElement;
    this.formElement = formElement;
    this.profileElement = profileElement;
    this.alertsElement = alertsElement;
    this.loadingElement = loadingElement;
    this.reposElement = reposElement;
    this.searchUserInput = "";

    this.hideLoading();
  }

  onInputChange(callback) {
    let debounceTimer;
    this.searchUserInputElement.addEventListener("keyup", (event) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchUserInput = event.target.value.trim();
        if (callback) {
          callback(this.searchUserInput);
        }
      }, 500);
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
    `;
  }

  renderUserRepo(repos) {
    repos.forEach((repo) => {
      const repoEl = document.createElement("li");
      repoEl.className =
        "list-group-item d-flex justify-content-between align-items-center";
      repoEl.innerHTML = `<a href="${repo.url}">${repo.name}</a>`;
      this.reposElement.appendChild(repoEl);
    });
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
