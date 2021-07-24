<script context="module" lang="ts">
    declare function require(path: any, callback: () => void): void;
    declare namespace require {
        function config(paths: any);
    }
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import type { EditorLanguage } from "./EditorLanguages"
    export type { EditorLanguage } from "./EditorLanguages"

    let monacoLoader: HTMLScriptElement;
    let monacoConatiner: HTMLElement;
    let monacoEditor: monaco.editor.IStandaloneCodeEditor;
    export let contents = writable<string>("");
    export let language: EditorLanguage = "json";

    const createMonaco = (): void => {
        monacoEditor = monaco.editor.create(monacoConatiner, {
            value: $contents,
            language,
            automaticLayout: true,
        });

        monacoEditor.getModel().onDidChangeContent((event) => {
            $contents = monacoEditor.getModel().getValue();
        });
    };

    onMount(() => {
        monacoConatiner = document.getElementById("container");
        monacoLoader.addEventListener("load", () => {
            require.config({ paths: { vs: "monaco-editor/min/vs" } });
            require(["vs/editor/editor.main"], createMonaco);
        });

    });
</script>

<svelte:head>
    <script bind:this={monacoLoader} src="monaco-editor/min/vs/loader.js"></script>
</svelte:head>
<div id="container" class="autosize" />

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
