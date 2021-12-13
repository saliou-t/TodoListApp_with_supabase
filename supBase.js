
  // Initialize
  const supabaseUrl = 'https://chat-room.supabase.co'
  const supabaseKey = 'public-anon-key'
  const supabase = Supabase.createClient(supabaseUrl, supabaseKey)

  // Get public rooms and their messages
  supabase
    .from('rooms')
    .select(`
      name,
      messages ( text )
    `)
    .eq('public', true)
    .then(response => {
      // Do something with the response
    })
