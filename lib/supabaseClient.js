// lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and API Key
const supabaseUrl = 'https://sisnvwhhrswccgecyvwn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpc252d2hocnN3Y2NnZWN5dnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MTQ4NzAsImV4cCI6MjA1OTI5MDg3MH0.LbW6bBgUQVmWMCSIt53BIVefekA4N30DCnXqRvcgjYc';

export const supabase = createClient(supabaseUrl, supabaseKey);
