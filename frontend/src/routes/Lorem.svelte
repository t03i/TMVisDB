<script lang="ts">
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
    let currentTile = 0;
</script>


<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/" >(icon)</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 1</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 2</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 3</span>
	</AppRailTile>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
	</svelte:fragment>
</AppRail>
