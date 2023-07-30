import Docs from "./pages/Docs.svelte";
import Home from "./pages/Home.svelte";
import Landing from "./pages/Landing.svelte";

export const routes = {
  "/": Landing,
  "/apps": Home,
  "/docs": Docs,
};
