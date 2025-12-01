
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text not null,
  created_at timestamptz default now()
);

create table affiliates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  display_name text,
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id),
  name text not null,
  price numeric not null,
  commission_percent numeric default 30,
  landing_url text not null,
  created_at timestamptz default now()
);

create table affiliate_links (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid references affiliates(id),
  product_id uuid references products(id),
  code text unique not null,
  created_at timestamptz default now()
);

create table clicks (
  id bigint primary key generated always as identity,
  link_id uuid references affiliate_links(id),
  ip text,
  user_agent text,
  created_at timestamptz default now()
);

create table sales (
  id bigint primary key generated always as identity,
  link_id uuid references affiliate_links(id),
  order_id text,
  amount numeric,
  commission numeric,
  created_at timestamptz default now()
);
