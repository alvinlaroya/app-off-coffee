import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = async ({ locals: { supabase } }) => {

    const fethNearbyStore = async () => {
        const { data, error } = await supabase.rpc('nearby_stores', {
            lat: 120.6187539,
            long: 16.3779467,
        })

        if (error) {
            console.error("Error fetching nearby store")
        } else {
            return data ?? []
        }
    }

    const fethStoresInView = async () => {
        const { data, error } = await supabase.rpc('stores_in_view', {
            min_lat: 120.618,
            min_long: 16.377,
            max_lat: 120.619,
            max_long: 16.376
        })

        if (error) {
            console.error("Error fetching nearby store")
        } else {
            return data ?? []
        }
    }

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

    const fetchRecentProducts = async () => {
        const restaurant = await fetchMyStore();

        const { data, error } = await supabase.rpc('get_all_recent_products_under_restaurant', {
            store_id: restaurant.id
        })

        if (error) {
            console.error(error)
        } else {
            return data ?? {}
        }
    }

    return {
        myStore: await fetchMyStore(),
        nearbyStores: await fethNearbyStore(),
        storesInView: await fethStoresInView(),
        recentProducts: await fetchRecentProducts(),
    };
}

export const actions: Actions = {
    addStore: async ({ request, locals: { supabase } }) => {
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