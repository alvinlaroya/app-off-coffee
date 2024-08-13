import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = async ({ locals: { supabase, session } }) => {
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
        categories: await fetchAllCategories()
    };
}

/* export const actions: Actions = {
    addProduct: async ({ request, locals: { supabase } }) => {
        const formData = await request.json()
        const { name, description, address, location, rating, followers, operation_time, website, phone, email, image, peak_hours } = formData

        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('stores')
            .insert([
                {
                    name,
                    description,
                    address,
                    location,
                    rating,
                    followers,
                    operation_time,
                    website,
                    phone,
                    email,
                    image,
                    peak_hours,
                    owner_id: user.id
                }
            ])
            .select()



        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            return { store: data ?? {} };
        }
    }
} */