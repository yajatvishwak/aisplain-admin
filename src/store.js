import { writable } from "svelte/store";

const store = writable({
  isCardModalOpen: false,
  isAddCardModalOpen: false,
  selectedCard: { name: "", id: "", url: "", apiKey: "" },
});
export default store;
