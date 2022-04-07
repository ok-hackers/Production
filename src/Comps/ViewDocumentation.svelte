<script lang="ts">
	import Quill from 'quill';
	import { onMount } from 'svelte';
	import type { Documentation } from '../Lib/DocumentationItems';
	export let Documentation: Documentation;
	let quillRenderer: HTMLDivElement;
	let QuillHTML: string;

	onMount(() => {
		let tempQuill = new Quill(quillRenderer);
		tempQuill.setContents(Documentation.data);
		QuillHTML = tempQuill.root.innerHTML;
	});
</script>

<div class="Block">
	<h2>
		{Documentation.type}
	</h2>
	<div class="QuillContent">
		{@html QuillHTML}
	</div>

	<div class="quillRenderer" bind:this={quillRenderer} />
</div>

<style>
	.quillRenderer {
		display: none;
	}

	.QuillContent {
		max-width: 90vw;
		border: 1px solid black;
		padding: 1em;
		margin-bottom: 1em;
		border-radius: 0.5em;
	}

	.QuillContent :global(img) {
		max-width: 100%;
	}

	.Block {
		background-color: white;
		padding: 1em;
		border-radius: 0.5em;
		margin-bottom: 2em;
	}

	.Block > h2 {
		margin-bottom: 0.5em;
	}
</style>
