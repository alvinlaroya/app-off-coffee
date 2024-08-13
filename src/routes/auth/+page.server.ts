import { fail, redirect } from '@sveltejs/kit'

import type { Actions } from './$types'
import type { Provider } from '@supabase/supabase-js'

export const actions: Actions = {
  login: async ({ request, locals: { supabase }, url }) => {
    const provider = url.searchParams.get("provider") as Provider;
    if (provider) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: '/auth/callback',
        },
      })

      if (error) {
        console.log(error)
        return fail(400, {
          message: "Something went wrong"
        })
      }

      throw redirect(303, data.url)
    }
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    } else {
      redirect(303, '/store.dashboard')
    }
  }
}