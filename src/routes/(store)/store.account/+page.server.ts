import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

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
            .eq('user_id', data.user.id)


        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            return { user: data ?? {} };
        }
    }
}