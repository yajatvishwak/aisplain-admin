<script>
  import store from "../../store";
  import axios from "axios";
  import Papa from "papaparse";
  import toast from "svelte-french-toast";
  let BASEURL = import.meta.env.VITE_BASEURL;

  async function createApp() {
    const response = await axios.post(BASEURL + "create-project", {
      name: data.name,
      url: data.url,
      docsUrl: urls,
      tone: data.tone,
    });
    if (response.data && "message" in response.data) {
      toast.success("Project created successfully");
    }
  }

  let file;
  let urls = [];
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  $: {
    if (file) {
      Papa.parse(file[0], {
        complete: function (results) {
          if (results && results.data && results.data.length > 0) {
            urls = results.data
              .filter((item) => {
                if (isValidUrl(item[0])) {
                  return item[0];
                }
              })
              .map((item) => item[0]);
          }
        },
      });
    }
  }
  let data = {
    name: "",
    url: "",
    tone: "",
  };
</script>

<input
  type="checkbox"
  bind:checked={$store.isAddCardModalOpen}
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box relative">
    <button
      on:click={() => ($store.isAddCardModalOpen = false)}
      class="absolute top-3 right-3 btn btn-xs btn-circle"
    >
      <svg
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <h3 class="font-bold text-lg">Add a new app</h3>
    <div class="py-4 flex">
      <form
        on:submit|preventDefault={createApp}
        class="flex flex-col gap-2 w-full"
      >
        <div>
          <label for="" class="label-text-alt">Landing page URL</label>
          <input
            bind:value={data.url}
            type="text"
            class="input input-bordered w-full bg-transparent"
          />
        </div>

        <div>
          <label for="" class="label-text-alt">App name</label>
          <input
            bind:value={data.name}
            type="text"
            class="input input-bordered w-full bg-transparent"
          />
        </div>
        <div>
          <label for="" class="label-text-alt">Tone of the sales pitch</label>
          <input
            bind:value={data.tone}
            type="text"
            class="input input-bordered w-full bg-transparent"
          />
        </div>
        <div>
          <label for="" class="label-text-alt">Documentation CSV</label>
          <div>
            {#if urls.length > 0}
              <div>
                {#if urls.length > 0}
                  <div class="badge badge-sm badge-success">
                    {urls.length} URLs parsed
                  </div>
                {/if}
                {#each urls as url}
                  {#if url && url.length > 0}
                    <div class="badge badge-sm">
                      {url.substring(url.lastIndexOf("/"))}
                    </div>
                  {/if}
                {/each}
              </div>
            {:else}
              <input
                type="file"
                bind:files={file}
                class="file-input file-input-bordered w-full"
              />
            {/if}
          </div>
        </div>
        <button type="submit" class="btn mt-3">Submit</button>
      </form>
    </div>
  </div>
</div>
