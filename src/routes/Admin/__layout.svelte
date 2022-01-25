<script lang="ts">
    import HamburgerMenu from "../../Comps/AdminHamburgerMenu.svelte";
</script>

<div id="AdminHamburgerLayer">
    <nav>
        <!-- Root Navmenu will be here -->
    </nav>
    <div id="ContentHolder">
        <svelte:component this={HamburgerMenu} />
        <div id="SlotHolder">
            <slot></slot>
        </div>
    </div>
</div>

<style>
    nav {
        height: 3em;
        background-color: lightgrey;
    }

    #ContentHolder {
        position: relative;
    }

    #SlotHolder {
        margin-left: 3em;
        min-height: calc(100vh - 3em);
    }
</style>