<script>
    export let data;
    $: ({ notes, supabase, user } = data);
</script>

<div>
	<h1>Dashboard</h1>
</div>

<!-- <h1>Private page for user: {user?.email}</h1>
<h2>Notes</h2>
<ul>
    {#each notes as note}
        <li>{note.note}</li>
    {/each}
</ul> -->