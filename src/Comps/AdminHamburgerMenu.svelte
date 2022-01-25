<script lang="ts">
    let HamburgerExspanded = false;

    function exspandHamburger() {
        HamburgerExspanded = !HamburgerExspanded;
    }
</script>

<div id="HamburgerContainer" class:expand={HamburgerExspanded} aria-label="HamburgerMenu">
    <div class="HamburgerButton">
        <img src="/MaterialDesignIcons/menu.svg" alt="Hamburger" on:click={exspandHamburger} aria-label="ExpandHamburgerMenu">
        <p>Collapse Menu</p>
    </div>
</div>

<style>
    #HamburgerContainer {
        position: absolute;
        background-color: green;
        top: 0;
        bottom: 0;
        left: 0;
        width: 3em;
        overflow-x: hidden;
    }

    .expand {
        overflow-x: visible !important;
        width: max-content !important;
    }

    .HamburgerButton {
        cursor: pointer;
        display: flex;
    }

    .HamburgerButton > img {
        width: 3em;
        height: 3em;
    }

    .HamburgerButton > p {
        align-self: center;
        margin: 0 0.5em;
    }
</style>