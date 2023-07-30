<script>
  // @ts-nocheck

  import store from "../store";
  import AddModal from "./components/AddModal.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import Card from "./components/Card.svelte";
  import CardModal from "./components/CardModal.svelte";
  import Navbar from "./components/Navbar.svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  let data = [
    {
      name: "Gomma",
      id: "12",
      url: "asdf",
      apiKey: "asd",
    },
  ];
  let BASEURL = import.meta.env.VITE_BASEURL;
  async function getAllApps() {
    const response = await axios.get(BASEURL + "get-all");
    if (
      response.data &&
      "projects" in response.data &&
      response.data.projects
    ) {
      data = response.data.projects.map((item) => {
        return { ...item, id: item._id, apiKey: item._id };
      });
    } else {
      data = [];
      toast.error("No projects found");
    }
  }
  onMount(async () => {
    await getAllApps();
  });
</script>

<Toaster />
<CardModal />
<AddModal />
<section class="mx-auto h-full min-h-screen max-w-screen-md p-10">
  <Navbar />
  <div class="mt-10">
    <div class="flex justify-between my-3 items-center">
      <div class="font-semibold">Manage your apps</div>
      <button
        on:click={() => ($store.isAddCardModalOpen = true)}
        class="btn btn-circle btn-sm"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-5">
      {#each data as card}
        <Card cardDeets={card} />
      {/each}
    </div>
  </div>
</section>
