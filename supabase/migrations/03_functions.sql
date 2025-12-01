
create or replace function get_affiliate_analytics() returns json as $$
  select json_build_object(
    'clicks', (select count(*) from clicks c join affiliate_links l on l.id = c.link_id where l.affiliate_id = auth.uid()),
    'sales', (select count(*) from sales s join affiliate_links l on l.id = s.link_id where l.affiliate_id = auth.uid()),
    'revenue', (select coalesce(sum(commission),0) from sales s join affiliate_links l on l.id = s.link_id where l.affiliate_id = auth.uid())
  );
$$ language sql security definer;
