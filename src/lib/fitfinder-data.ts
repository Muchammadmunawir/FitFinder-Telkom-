export type Gym = {
  id: string;
  name: string;
  location: string;
  distance: string;
  match: number;
  rating: string;
  reviews: string;
  daily: string;
  monthly: string;
  image: string;
  tags: string[];
  facilities: string[];
  accent?: string;
  description: string;
};

export const gyms: Gym[] = [
  {
    id: "barbell-house",
    name: "Barbell House Sukapura",
    location: "Sukapura",
    distance: "450m from Gate 2 Telkom University",
    match: 98,
    rating: "4.9",
    reviews: "184",
    daily: "Rp 15.000",
    monthly: "Rp 120.000",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=85&w=900",
    tags: ["4 Squat Racks", "Olympic Barbells", "Dumbbells up to 40kg"],
    facilities: ["Motor Area", "Water Refill", "AC", "Locker"],
    accent: "Student favorite",
    description: "Barbell House punya rack lengkap, akses mudah dari Gate 2, dan student monthly pass yang paling sering dipilih mahasiswa Tel-U.",
  },
  {
    id: "nusantara",
    name: "Gym Nusantara Ciganitri",
    location: "Ciganitri",
    distance: "1.2 km from Telkom (Motorcycle 3 min)",
    match: 92,
    rating: "4.7",
    reviews: "96",
    daily: "Rp 20.000",
    monthly: "Rp 160.000",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=85&w=900",
    tags: ["Smith Machine", "Full Dumbbell Set", "Cardio Zone (6 Rigs)"],
    facilities: ["Full AC", "Hot Shower", "Free Wi-Fi"],
    description: "Gym luas dengan area cardio dan dumbbell lengkap untuk sesi latihan setelah jam kuliah.",
  },
  {
    id: "titan",
    name: "Titan Power Sukabirus",
    location: "Sukabirus",
    distance: "650m from Telkom Dormitories",
    match: 86,
    rating: "4.6",
    reviews: "210",
    daily: "Rp 10.000",
    monthly: "Rp 95.000",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=85&w=900",
    tags: ["Heavy Free Weights", "2 Power Racks", "Calisthenics Rig"],
    facilities: ["Motor Safe", "Chalk Allowed", "Warung Next Door"],
    accent: "Most Budget-Friendly",
    description: "Pilihan budget-friendly dekat dormitory dengan free weights dan power rack untuk latihan strength.",
  },
];

export const locations = ["ALL", "SUKAPURA", "SUKABIRUS", "CIGANITRI", "BOJONGSOANG"];

export const equipment = ["Power Racks", "Olympic Barbells", "Dumbbells", "Cable Crossover", "Smith Machine", "Treadmills"];

export const facilities = [
  { label: "Motorized Parking", detail: "Dedicated paid lot for 40+ motorbikes", icon: "map-pin" as const },
  { label: "Air Conditioning (AC)", detail: "Natural cross-ventilation + exhaust wall fans", icon: "cloud" as const },
  { label: "Shower & Changing Rooms", detail: "3 separated cubicles + mirror grooming area", icon: "grid" as const },
  { label: "Member Bag Lockers", detail: "Bring-your-own padlock protected locker bank", icon: "lock" as const },
  { label: "Water Refill Station (Galon)", detail: "Complimentary cold & normal water dispenser", icon: "cloud" as const },
];

export function getGymById(id: string) {
  return gyms.find((gym) => gym.id === id);
}
