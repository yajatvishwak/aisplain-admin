<script>
  // @ts-nocheck
  import store from "../store";
  import toast, { Toaster } from "svelte-french-toast";
  import Navbar from "./components/Navbar.svelte";
  import step1 from "../assets/step1.png";
  import step2 from "../assets/step2.png";
  import { push } from "svelte-spa-router";
</script>

<Toaster />

<section class="mx-auto h-full min-h-screen max-w-screen-md p-10">
  <Navbar />
  <div class="text-3xl mt-10">Documentations</div>
</section>
