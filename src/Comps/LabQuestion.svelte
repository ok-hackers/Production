<script lang="ts">
	import type {Question} from '../Lib/DocumentationItems';
	import Quill from 'quill';
	import { onMount } from 'svelte';

	export let QuestionData: Question;
	export let deleteFunction;

	let QuillEditor: HTMLElement;
	let questionEditor: Quill;
	let options = {
		modules: {
			toolbar: ['bold', 'italic','underline', 'image']
		},
		theme: 'snow'
	};
	
	onMount(()=>{
		questionEditor = new Quill(QuillEditor, options);
		questionEditor.setContents(QuestionData.data);
		questionEditor.on('text-change', StoreQuillInfo);
	});

	function StoreQuillInfo() {
		let delta = questionEditor.getContents();
		QuestionData.data = delta;
	}

	$: if (QuestionData.answer[QuestionData.answer.length - 1].data != "") {
		QuestionData.answer = [...QuestionData.answer, {data: "", correct: false}]
	}
</script>

<div class="Question">
	<div class="DragArea">
		<img src="/MaterialDesignIcons/drag.svg" alt="Drag">
	</div>
	<div on:click={deleteFunction} class="deleteMe">
		X
	</div>
	<div class="QuestionFields">
	<div class="QuillEditor">
		<div bind:this={QuillEditor}></div>
	</div>
	<div class="Answers">
		{#each QuestionData.answer as answer}
		<div class=Answer>
				 <input class="Text" type="text" bind:value={answer.data}>
				 <input class="Check" type="checkbox" name="Correct" id="Correct" bind:value={answer.correct}>
				</div>
		{/each}
	</div>
	</div>
</div>

<style>
.Question {
	background-color: white;
	border-radius: 10px;
	margin: 2em;
	padding: 1em;
	display: flex;
	position: relative;
}

.DragArea {
	width: 10%;
	background-color: grey;
	display: grid;
	place-items: center;
}

.DragArea>img {
	width: 100%;
}

.deleteMe {
	width: -1em;
	height: 1em;
	position: absolute;
	top: 0.5em;
	right: 0.3em;
	cursor: pointer;
	font-size: large;
	font-weight: 900;
	color: red;
}

.QuestionFields {
	width: 90%;
}

.QuillEditor {
	margin: 0 0.5em;
}

.Answers {
	margin-top: 2em;
}

.Answer {
	display: flex;
	margin: 0.5em;
}

.Check {
	width: max-content;
}

.Text {
	width: 100%;
}
</style>