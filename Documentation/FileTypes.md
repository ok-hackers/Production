# Important files types and locations
## File types
There exist 4 main file types in this project
* is a wild card
1. *.ts - This is a general typescript file if under `src/lib/` it is a custom library file that can be imported into either a .svelte or another .ts file
2. *.svelte - This is one of two file types. 
    1. It is a svelte component under routes and is a valid route in the Node app
    2. If it is not under the routes sub folder it is a component and can be included as an element in other .svelte files
3. *.test.ts - This is a jest test and should be located under `src/__tests__/` it will be run with `npm run test`
4. *.spec.ts - This ia a cypress test and should be located under `cypress/integration/` it will be run with `npm run cypress`

## File Locations
1. `cypress` where cypress files are located
    1. `cypress/integration/` where the cypress tests should be located
2. `src` the main src files for sveltekit
    1. `src/__test__/` where all jest test files should be located named as *.test.ts
    2. `src/Comps/` where *.svelte files are located that are purely compontents and not a specific route
    3. `src/Lib/` where custom library files go see File Types above
    4. `src/routes/` The root directory of the web url that is not in the static folder only .svelte and .ts file should be located here
        1. `src/routes/Admin` the `localhost:3000/Admin/` Route
        2. `src/routes/User` the `localhost:3000/User/` Route
        3. `src/routes/APIs` the general API sub folder of the site accessable under `localhost:3000/APIs`
3. `static/` The static files location of the svelteServer