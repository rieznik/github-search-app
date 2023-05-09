import { UI } from "./ui.js";
import { API } from "./api.js";

const ui = new UI(
  document.querySelector(".searchUser"),
  document.getElementById("form"),
  document.getElementById("profile"),
  document.getElementById("alerts"),
  document.getElementById("loading")
);
const api = new API();

const run = () => {
  console.log("start");

  const searchUser = async (input) => {
    try {
      ui.removeUserData();
      ui.showLoading();
      const userData = await api.getUserData(input);
      const userRepos = await api.getUserRepos(input);
      console.log("userRepos", userRepos);
      ui.renderUserData(userData);
    } catch (error) {
      console.log("error", error);
      ui.renderError(error);
    } finally {
      ui.hideLoading();
    }
  };

  ui.onInputChange(searchUser);
  ui.onFormSubmit(searchUser);
};

run();
