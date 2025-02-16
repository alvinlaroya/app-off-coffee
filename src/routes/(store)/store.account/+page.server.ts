import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'


export const load = async ({ locals: { supabase, session } }) => {

    const fetchProfile = async () => {
        let { data, error } = await supabase
            .from('profiles')
            .select(`id, fname, lname, email, avatar, roles (id), stores (name)`)
            .eq('id', session?.user.id)


        console.log("PROPFILE", data)

        if (error) {
            console.error(error)
        } else {
            return data[0] ?? {}
        }
    }

    return {
        profile: await fetchProfile()
    };
}

export const actions: Actions = {
    update: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const fname = formData.get('fname') as string
        const lname = formData.get('lname') as string
        const address = formData.get('address') as string
        const phone = formData.get('phone') as string
        const avatar = "https://www.thefamouspeople.com/profiles/images/lisa-manoban-6.jpg";

        const { data, error } = await supabase.auth.updateUser({
            data: { fname, lname, address, phone, avatar }
        })

        await supabase
            .from('profiles')
            .update({ fname, lname, avatar })
            .eq('id', data.user.id)


        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            return { user: data ?? {} };
        }
    }
}