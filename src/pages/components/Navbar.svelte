<script>
  import { push } from "svelte-spa-router";
  import logo from "../../assets/logo.png";
</script>

<div class="flex items-center justify-between">
  <div class="flex gap-3 items-center">
    <div class="w-7 h-7"><img src={logo} alt="" /></div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => push("/")} class="font-bold text-2xl cursor-pointer">
      Ai-Splain
    </div>
  </div>
  <div>
    <button
      on:click={() => push("/apps")}
      class="btn rounded-full btn-ghost btn-xs">Manage Apps</button
    >
  </div>
</div>
