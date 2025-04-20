import { createClient } from '@supabase/supabase-js'
const URL = 'https://nayriukacdutcdtqumra.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heXJpdWthY2R1dGNkdHF1bXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzQ3MTQsImV4cCI6MjA2MDIxMDcxNH0.9AYqV0wTlD3ushiJVBUMW1qVTTfTGx_KQTiklQuoE8Q';

export const supabase = createClient(URL, API_KEY);