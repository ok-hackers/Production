# The testing repo
Get used to using git and branches

## Handy Commands
`npm i` install any dependencies. If something is not working run this first.
`npm run dev` run the interactive version of the website (live reloading)
`npm run test` run all .test.ts files in the test folder

## Notes about file names and locations
Anything under the routes folder will be rendered as an endpoint on the website
.svelte files  will be rendered as a page or component
.ts files will be rendered as a REST endpoint and executed on the server

## Notes about svelte
A svelte file should consist of 3 sections
**The script section**
```
<script lang="ts">

</script>
```
**The HTML section**
Note each svelte component should have one root html tag. Most likely a div.
```
<div>
<!-- Code here -->
</div>
```
**The CSS Section**
```
<style>
.class {
    font-size: 2em;
}
</style>
```