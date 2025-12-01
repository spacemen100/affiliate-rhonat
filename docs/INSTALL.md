
# Installation

1. Crée un projet Supabase.
2. Dans le SQL Editor, exécute dans l'ordre :
   - supabase/migrations/01_init.sql
   - supabase/migrations/02_policies.sql
   - supabase/migrations/03_functions.sql
3. Crée un projet Node dans `frontend`:
   - npm install
   - Crée `.env` avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.
4. Lancer le frontend :
   - npm run dev
