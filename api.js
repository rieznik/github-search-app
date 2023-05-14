export class API {
  #reposNumber = 5;
  async getUserData(input) {
    if (!input) {
      throw new Error("Please enter a username");
    }
    const response = await fetch(
      `https://api.github.com/users/${input}`
    );
    const data = await response.json();
    if (data.message === "Not Found") {
      throw new Error(`User "${input}" not found`);
    }
    return data;
  }

  async getUserRepos(input) {
    const response = await fetch(
      `https://api.github.com/users/${input}/repos?per_page=${
        this.#reposNumber
      }&sort=updated`
    );
    const data = await response.json();
    return data;
  }
}
