import { useEffect, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/supabase";

type FatchingTableOptions = {
  table: string;
  filter?: string;
  filterValue?: string | number | boolean;
};

export function FatchingTable<T>({
  table,
  filter,
  filterValue,
}: FatchingTableOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel;

    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(table).select("*");

        if (filter && filterValue) {
          query = query.eq(filter, filterValue);
        }

        const { data: initialData, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setData(initialData || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel(`${table}_changes`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: table,
          },
          async () => {
            await fetchData();
          }
        )
        .subscribe();
    };

    fetchData();
    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, filter, filterValue]);

  return { data, loading, error };
}
