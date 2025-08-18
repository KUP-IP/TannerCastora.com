#!/bin/bash

echo "Setting up Vercel environment variables for production deployment"
echo ""
echo "You'll need the following from your Supabase project:"
echo "1. Go to https://supabase.com/dashboard"
echo "2. Select your project"
echo "3. Go to Settings > Database"
echo "4. Find 'Connection string' section"
echo ""

# Function to add environment variable to Vercel
add_env_var() {
    local key=$1
    local value=$2
    echo "Adding $key to Vercel..."
    vercel env add "$key" production <<< "$value"
}

# Get DATABASE_URL
echo "Please enter your Supabase DATABASE_URL:"
echo "(Use the 'Connection pooling' URL with mode=pool, ending with ?pgbouncer=true)"
read -r DATABASE_URL

# Add required environment variables
add_env_var "DATABASE_URL" "$DATABASE_URL"
add_env_var "NEXTAUTH_SECRET" "xYJ4/lmhIKQ/5uXHvCcnH0C2vvb5EMALht3bBKCP6R0="
add_env_var "ADMIN_EMAIL" "admin@tannercastora.com"
add_env_var "ADMIN_PASSWORD" "Stig#2025$Football!"

# Get deployment URL
echo ""
echo "Enter your Vercel deployment URL (e.g., https://your-project.vercel.app):"
read -r NEXTAUTH_URL
add_env_var "NEXTAUTH_URL" "$NEXTAUTH_URL"

echo ""
echo "Environment variables added successfully!"
echo "Your project will now redeploy automatically with the new settings."
echo ""
echo "After deployment completes, visit $NEXTAUTH_URL/api/seed to initialize the database."