import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

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