import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
  console.log("HEHE")
  const {
    url,
    locals: { supabase }
  } = event;
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/';

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      console.log("NO ERROR")
      throw redirect(303, `/${next.slice(1)}`);
    }
  }

  console.log("ERROR")

  // return the user to an error page with instructions
  throw redirect(303, '/auth/auth-code-error');
};