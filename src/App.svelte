<script lang="ts">
    import Editor from "./components/editor/Editor.svelte";
    import FileViewer from "./components/workspace/FileViewer.svelte";
    import EntityViewer from "./components/entity/EntityViewer.svelte";
</script>

<main>
    <div class="workspace-wrapper">
        <div class="workspace-left">
            <FileViewer />
        </div>
        <div class="workspace-right">
            <div class="editors">
                <Editor />
                <EntityViewer />
            </div>
        </div>
    </div>
</main>

<style>
    :root {
        padding: 0 0 0 0;
        margin: 0 0 0 0;
    }

    :global(html) {
        font-size: 10pt;
    }

    :global(body) {
        padding: 0 0 0 0;
        margin: 0 0 0 0;
    }

    main {
        padding: 0 0 0 0;
        margin: 0 0 0 0;
    }

    .workspace-wrapper {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
    }
    .workspace-left {
        width: 10rem;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .workspace-right {
        flex-grow: 1;
    }

    .editors {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
