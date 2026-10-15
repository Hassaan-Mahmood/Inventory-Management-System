// Apne Supabase project ka URL aur anon public key yahan likhein
// (Dashboard -> Project Settings -> API)
const PROJECTURL = `https://eceffzgpwyboqgarsavy.supabase.co`;
const ANON_PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZWZmemdwd3lib3FnYXJzYXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjY2NDQsImV4cCI6MjEwNzY0MjY0NH0.X4HTxi7LzUdIXgmTYixw8hpS-vv5Z4jELGmCvqfIzuU`;

const supabase = window.supabase.createClient(PROJECTURL, ANON_PUBLIC_KEY);
export default supabase;


