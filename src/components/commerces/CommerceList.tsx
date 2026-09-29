import type { CommerceWithOwnerDTO } from "@/types";

type CommerceListProps = {
  commercesWithOwner: CommerceWithOwnerDTO[];
};

export function CommerceList({ commercesWithOwner }: CommerceListProps) {
  return (
    <section className="bg-card col-span-3 p-4">
      <main className="grid-cols-5">
        <div></div>
      </main>
    </section>
  );
}
