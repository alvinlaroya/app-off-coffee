import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = async ({ locals: { supabase } }) => {

    const fetchMyStore = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        let { data: stores, error } = await supabase
            .from('stores')
            .select("*")
            .eq('owner_id', user.id)

        if (error) {
            console.error(error)
        } else {
            return stores[0] ?? {}
        }
    }

    return {
        myStore: await fetchMyStore()
    };
}

export const actions: Actions = {
    addStore: async ({ request, locals: { supabase } }) => {
        const formData = await request.json()
        const { name, description, address, location, rating, followers, operation_time, website, phone, email, peak_hours } = formData

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
    },
    updateStore: async ({ request, locals: { supabase } }) => {
        const formData = await request.json()
        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('stores')
            .update(formData)
            .eq('id', formData.id)
            .select()


        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            return { store: data ?? {} };
        }
    },
    updateOpenClose: async ({ request, locals: { supabase } }) => {
        const formData = await request.json()
        const { id, is_open_today } = formData

        const { data, error } = await supabase
            .from('stores')
            .update({ is_open_today })
            .eq('id', id)
            .select()


        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            return { store: data ?? {} };
        }
    },
    updateActivation: async ({ request, locals: { supabase } }) => {
        const formData = await request.json()
        const { id, is_active } = formData

        const { data, error } = await supabase
            .from('stores')
            .update({ is_active })
            .eq('id', id)
            .select()


        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            return { store: data ?? {} };
        }
    }
}