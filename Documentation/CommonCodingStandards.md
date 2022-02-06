# Common coding standards.

## File names and routes
Files names are to be in camel case. Routes are to be in camel case starting with a capital letter. such as `AdminMenu/userSettings` the corrisponding file route `AdminMenu/userSettings.svelte`

## Variable names
Local variable names are to be in camel case `databaseSnapshot`. 

Exported library files are to be in normal camel case if they are a secondary export or capital camel case if it is the default export.
Enumerables and type only exports are to be capital camel case as well
Svelte props are to always be in camel case.
```
export let fooBar = 10;
default export let DefaultFooBar = 11;
export enum MyType = {
    ready: 1
}
```