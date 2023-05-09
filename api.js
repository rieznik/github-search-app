const CLIENT_ID = "6ea01c207144ba539c8f";
const CLIENT_SECRET = "0498c5931d5620e4319f9f71b93a45b5886ca8bb";

export class API {
  #reposNumber = 5;
  async getUserData(input) {
    if (!input) {
      throw new Error("Please enter a username");
    }
    const response = await fetch(
      `https://api.github.com/users/${input}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
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
      }&sort=updated&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    );
    const data = await response.json();
    return data;
  }
}
