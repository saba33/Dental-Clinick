
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nqderlaxjcbkptzpireo.supabase.co';
const supabaseKey = 'sb_publishable_tuDKKEYw-GOug5GDEuMUxg_EisDL7jx';

export const supabase = createClient(supabaseUrl, supabaseKey);
