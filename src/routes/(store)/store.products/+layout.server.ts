import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { supabase, session } }) => {
    const fetchAllProducts = async () => {
        const { data, error } = await supabase.rpc('get_all_products_under_restaurant', {
            store_owner_id: session?.user.id
        })

        if (error) {
            console.error("Error fetching all products under restaurant", error)
        } else {
            return {
                products: data ?? [],
            }
        }

        return {}
    }

    return {
        allProducts: await fetchAllProducts(),
    };
}