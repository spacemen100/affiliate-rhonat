
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const body = await req.json();
  const { link_id, amount, order_id } = body;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: link } = await supabase
    .from("affiliate_links")
    .select("product_id")
    .eq("id", link_id)
    .single();

  if (!link) {
    return new Response("Invalid link", { status: 400 });
  }

  const { data: product } = await supabase
    .from("products")
    .select("commission_percent")
    .eq("id", link.product_id)
    .single();

  const commission = (amount * product.commission_percent) / 100;

  await supabase.from("sales").insert({
    link_id,
    order_id,
    amount,
    commission,
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
