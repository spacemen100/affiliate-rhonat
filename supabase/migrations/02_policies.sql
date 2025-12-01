
alter table affiliate_links enable row level security;
alter table clicks enable row level security;
alter table sales enable row level security;

create policy affiliate_own_links on affiliate_links
for select using (affiliate_id = auth.uid());

create policy affiliate_own_clicks on clicks
for select using (
  link_id in (select id from affiliate_links where affiliate_id = auth.uid())
);

create policy affiliate_own_sales on sales
for select using (
  link_id in (select id from affiliate_links where affiliate_id = auth.uid())
);
