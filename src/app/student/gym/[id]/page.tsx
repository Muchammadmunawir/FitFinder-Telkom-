import Link from "next/link";
import { notFound } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { getGymById } from "@/lib/fitfinder-data";
export const instant = false;

type Props = { params: Promise<{ id: string }> };

export default async function StudentGymDetailPage({ params }: Props) {
  const { id } = await params;
  const gym = getGymById(id);
  if (!gym) notFound();
  return <StudentLayout><main className="mx-auto max-w-3xl px-5 pb-28 pt-5 sm:px-8"><Link href="/student/home" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold"><Icon name="arrow-left" size={18} /> Back to Discover</Link><div className="overflow-hidden rounded-3xl border border-[#e5e3e2] bg-white"><div className="relative h-64"><img src={gym.image} alt={gym.name} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><span className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-xs font-bold text-lime-400">⚡ {gym.match}% MATCH</span><h1 className="absolute bottom-5 left-5 text-3xl font-black text-white">{gym.name}</h1></div><div className="space-y-6 p-5 sm:p-7"><div className="flex flex-wrap gap-2"><Badge variant="lime"><Icon name="map-pin" size={13} />{gym.location}</Badge><Badge><Icon name="star" size={13} className="text-lime-600" /> {gym.rating} ({gym.reviews})</Badge></div><p className="text-sm leading-7 text-gray-600">{gym.description}</p><div className="grid grid-cols-2 gap-3"><Card className="p-4"><p className="text-[10px] uppercase text-gray-500">Daily Pass</p><strong className="mt-1 block text-lg">{gym.daily}</strong></Card><Card className="p-4"><p className="text-[10px] uppercase text-gray-500">Student Monthly</p><strong className="mt-1 block text-lg">{gym.monthly}</strong></Card></div><div><h2 className="mb-3 text-sm font-bold">Facilities & Equipment</h2><div className="flex flex-wrap gap-2">{[...gym.tags, ...gym.facilities].map((item) => <Badge key={item}>{item}</Badge>)}</div></div><button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-semibold text-white">Contact Gym <Icon name="arrow-right" size={18} /></button></div></div></main></StudentLayout>;
}
