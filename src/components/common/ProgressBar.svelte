<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from "d3";

    export let progress = 0;

    let progressBar: HTMLDivElement;
    let progressD3: d3.Selection<HTMLDivElement, {}, null, any>;
    let outerSvg: d3.Selection<SVGSVGElement, {}, null, any>;
    let outerRect: d3.Selection<SVGRectElement, {}, null, any>;
    let innerRect: d3.Selection<SVGRectElement, {}, null, any>;

    let outerBarHeight = 5;
    let outerBarWidth;

    onMount(() => {
        init();
    });

    function init() {
        progressD3 = d3.select(progressBar);
        progressD3.attr("height", outerBarHeight);
        progressD3.attr("width", outerBarWidth);

        outerSvg = progressD3.append("svg");
        outerSvg.attr("height", outerBarHeight);

        outerRect = outerSvg.append("rect");
        outerRect.attr("height", outerBarHeight);
        outerRect.attr("width", outerBarWidth);
        outerRect.attr("fill", "#FFFFFF");

        innerRect = outerSvg.append("rect");
        innerRect.attr("height", outerBarHeight);
        innerRect.attr("width", 0);
        innerRect.attr("fill", "#69a3b2");

        //doUpdate();
    }

    export function updateProgress(progress: number) {
        if (progress >= 0 && progress <= 100) {
            let width = Math.floor(outerBarWidth * (progress / 100));
            innerRect.attr("width", width);
        }
    }

    function doUpdate() {
        if (progress < 100) {
            progress += 5;
            updateProgress(progress);
            setTimeout(doUpdate, 300);
        } else {
            outerSvg.remove();
            progress = 0;
            setTimeout( init, 800);
        }
    }
</script>

<div bind:clientWidth={outerBarWidth}>
    <div bind:this={progressBar} class="progress" />
</div>

<style>
    .progress {
        flex-grow: 1;
    }
</style>
