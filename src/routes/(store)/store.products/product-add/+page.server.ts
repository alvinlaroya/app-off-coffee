import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

let myStore: any;

export const load = async ({ locals: { supabase, session } }) => {
    const fetchMyStore = async () => {
        let { data: stores, error } = await supabase.rpc("get_store_detail", {
            store_owner_id: session?.user.id
        })

        myStore = stores[0];
    }

    const fetchAllCategories = async () => {
        const { data, error } = await supabase.rpc('get_all_categories')

        if (error) {
            console.error("Error fetching all products under restaurant")
        } else {
            return data ?? []
        }

        return []
    }

    return {
        myStore: await fetchMyStore(),
        categories: await fetchAllCategories()
    };
}

export const actions: Actions = {
    addProduct: async ({ request, locals: { supabase } }) => {

        interface Category {
            value: string;
            label: string;
            disabled: boolean;
        }

        const formData = await request.json()
        const { name,
            description,
            price,
            price_added,
            category,
            upsell,
            variants,
            image } = formData

        const { data, error } = await supabase
            .from('products')
            .insert([
                {
                    name,
                    description,
                    price,
                    price_added,
                    category: category.map((item: Category) => item?.value),
                    upsell,
                    variants,
                    image,
                    store_id: myStore.id
                }
            ])
            .select()


        if (error) {
            console.error("Error adding store", error)
        } else {
            return { store: data ?? {} };
        }
    },
}