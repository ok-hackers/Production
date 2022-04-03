<script lang="ts">
	import type {Documentation} from '../Lib/DocumentationItems';
	import {onMount} from 'svelte'
	import Quill from 'quill';

	export let DocumentationData: Documentation;
	export let deleteFunction;

	let QuillEditor: HTMLElement;
	let documentationEditor: Quill;
	let options = {
		modules: {
			toolbar: ['bold', 'italic','underline', 'image']
		},
		theme: 'snow'
	};
	
	onMount(()=>{
		documentationEditor = new Quill(QuillEditor, options);
		documentationEditor.setContents(DocumentationData.data);
		documentationEditor.on('text-change', StoreQuillInfo);
	});

	function StoreQuillInfo() {
		let delta = documentationEditor.getContents();
		DocumentationData.data = delta;
	}
</script>

<div class="Documentation">
	<div class="DragArea">
		<img src="/MaterialDesignIcons/drag.svg" alt="Drag">
	</div>
	<div on:click={deleteFunction} class="deleteMe">
		X
	</div>
	<div class="QuillEditor">
		<div bind:this={QuillEditor}></div>
	</div>
</div>

<style>
.Documentation {
	background-color: white;
	border-radius: 10px;
	margin: 2em;
	padding: 1em;
	display: flex;
	position: relative;
}

.DragArea {
	width: 100px;
	background-color: grey;
	display: grid;
	place-items: center;
	height: max-content;
}

.DragArea>img {
	width: 100%;
}

.QuillEditor {
	width: 90%;
	height: max-content;
	margin: 0 0.5em;
}
.deleteMe {
	width: 1em;
	height: 1em;
	position: absolute;
	top: 0.5em;
	right: 0.5em;
	cursor: pointer;
}
</style>