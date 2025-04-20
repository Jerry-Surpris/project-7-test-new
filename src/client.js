import { createClient } from '@supabase/supabase-js'
const URL = 'https://zfdfselfxerhgrqoztja.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZGZzZWxmeGVyaGdycW96dGphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMjE3NDcsImV4cCI6MjA2MDY5Nzc0N30.6HpSGdGcWr6acOlifv6aUJQ3k3Z1l_ZTQMkfmcn8Ui8';

export const supabase = createClient(URL, API_KEY);