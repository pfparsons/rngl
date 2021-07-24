<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    import mermaid from "mermaid";
    let mermaidContainer: HTMLDivElement;
    let graphContainer: HTMLElement;
    export let contents = writable<string>("graph TB\na-->b");

    function insertSvg(svgCode: string, bindFunctions: (element: Element) => void, container?: Element) {
        graphContainer.innerHTML = svgCode;
    }

    onMount(() => {
        mermaid.initialize({ startOnLoad: true, securityLevel: "loose" });
        mermaid.mermaidAPI.render("mermaidGraph", $contents, insertSvg);
    });
</script>

<div class="autosize" bind:this={mermaidContainer}>
    <div bind:this={graphContainer} />
</div>

<style>
    .autosize {
        box-sizing: border-box;
        height: 100%;
        flex: 1;
        border: 1px solid rgb(192, 192, 228);
        border-radius: 3px;
        padding: 3px 8px 3px 8px;
        margin: 3px 3px 3px 3px;
    }
</style>
