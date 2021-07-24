<script lang="ts">
    import FileInfo from "./FileInfo.svelte";
    import{ FileSet } from "../../lib/processor/MainProcessDispatcher";

    const fileSet = new FileSet();

  function onDragEnter() {
    console.log("viewer drag enter");
  }

  function onDragLeave() {
    console.log("viewer drag leave");
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDragDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    console.log("Dropped");
    let files: FileList = event.dataTransfer.files;
    fileSet.addFiles(files);

    let file: File = files[0];
    let text = `File: ${file.name}\nSize: ${file.size}`;
    fileLoadWorker.postMessage({ type: "load-file", file });
    console.log(text);
    setText(text);
  }

</script>

<div class="autosize">
    <h1>Files</h1>
    <div class="filelist">
        <div class="file"><FileInfo filename="file1.json" /></div>
        <div class="file"><FileInfo filename="file2.json" /></div>
        <div class="filler" />
    </div>
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

    .file {
        flex-basis: content;
        flex-grow: 0;
    }

    .filler {
        flex-grow: 1;
    }

    .filelist {
        display: flex;
        flex-direction: column;
    }
</style>
