import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://example.com/auth/callback',
      },
    })
    
    if (data.url) {
      redirect(303, data.url) // use the redirect API for your server framework
    }
    

    console.log("LOGIN WITH GOOGLE")


    /* const { error } = await supabase.auth.signInWithPassword({ email, password }) */
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    } else {
      redirect(303, '/store.dashboard')
    }
  },
  loginWithGoogle: async () => {
    console.log("HAHAHA")
  }
}