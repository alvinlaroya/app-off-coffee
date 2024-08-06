import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    signup: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { data, error } = await supabase.auth.signUp({ email, password })

        // insert user id in profiles
        await supabase
            .from('profiles')
            .insert([
                { user_id: data?.user?.id, email },
            ])

        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            return console.log("USER DATA", data)
            redirect(303, '/auth/confirm')
        }
    }
}