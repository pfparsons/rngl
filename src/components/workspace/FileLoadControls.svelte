<script context="module" lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faStop } from '@fortawesome/free-solid-svg-icons'
</script>

<script lang="ts">
    import ProgressBar from "../common/ProgressBar.svelte";

</script>

<ProgressBar/>
<Fa icon={faStop} color="#FF0000"/>
