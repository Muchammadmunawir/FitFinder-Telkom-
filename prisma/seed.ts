import { PrismaClient, Role, LocationZone } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding FitFinder Telkom database...");

  // 1. Clean existing records
  await prisma.gymFacility.deleteMany();
  await prisma.gymEquipment.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.gym.deleteMany();
  await prisma.user.deleteMany();

  // 2. Hash password
  const hashedPassword = await bcrypt.hash("TelkomFit2025!", 10);

  // 3. Create Student User
  const student = await prisma.user.create({
    data: {
      name: "Arya Pratama",
      email: "student@telkomuniversity.ac.id",
      password: hashedPassword,
      role: Role.student,
      program: "S1 Informatika",
      studentId: "1301210000",
      phone: "+62 812-3456-7890",
    },
  });

  // 4. Create Owner User
  const owner = await prisma.user.create({
    data: {
      name: "Taufik Hidayat",
      email: "partner@titanpower.id",
      password: hashedPassword,
      role: Role.owner,
      phone: "+62 812-9876-5432",
    },
  });

  console.log(`Created users: ${student.email} (student), ${owner.email} (owner)`);

  // 5. Create Master Equipments
  const equipmentNames = [
    "Power Racks",
    "Olympic Barbells",
    "Dumbbells",
    "Cable Crossover",
    "Smith Machine",
    "Treadmills",
    "Calisthenics Rig",
    "Leg Press Machine",
  ];

  const equipmentMap = new Map<string, number>();
  for (const name of equipmentNames) {
    const eq = await prisma.equipment.create({
      data: { equipmentName: name },
    });
    equipmentMap.set(name, eq.id);
  }
  console.log(`Created ${equipmentMap.size} master equipment items.`);

  // 6. Create Gyms
  const gymsData = [
    {
      slug: "barbell-house",
      name: "Barbell House Sukapura",
      address: "Jl. Sukapura No. 12",
      locationZone: LocationZone.Sukapura,
      distance: "450m from Gate 2 Telkom University",
      dailyPrice: 15000,
      monthlyPrice: 120000,
      ktmDiscount: true,
      rating: 4.9,
      reviewsCount: 184,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=85&w=900",
      accent: "Student favorite",
      description: "Barbell House punya rack lengkap, akses mudah dari Gate 2, dan student monthly pass yang paling sering dipilih mahasiswa Tel-U.",
      openingHours: "07:00",
      closingHours: "22:00",
      equipments: [
        { name: "Power Racks", detail: "4 Squat Racks" },
        { name: "Olympic Barbells", detail: "Olympic Barbells & Plates" },
        { name: "Dumbbells", detail: "Dumbbells up to 40kg" },
      ],
      facilities: [
        { name: "Motor Area", detail: "Dedicated parking lot for 30+ bikes" },
        { name: "Water Refill", detail: "Free cold & normal water dispenser" },
        { name: "AC", detail: "Air conditioning" },
        { name: "Locker", detail: "Padlock member lockers" },
      ],
    },
    {
      slug: "nusantara",
      name: "Gym Nusantara Ciganitri",
      address: "Jl. Ciganitri Tengah No. 45",
      locationZone: LocationZone.Ciganitri,
      distance: "1.2 km from Telkom (Motorcycle 3 min)",
      dailyPrice: 20000,
      monthlyPrice: 160000,
      ktmDiscount: true,
      rating: 4.7,
      reviewsCount: 96,
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=85&w=900",
      accent: "Spacious Cardio Zone",
      description: "Gym luas dengan area cardio dan dumbbell lengkap untuk sesi latihan setelah jam kuliah.",
      openingHours: "06:30",
      closingHours: "21:30",
      equipments: [
        { name: "Smith Machine", detail: "Multi-angle smith machine" },
        { name: "Dumbbells", detail: "Full dumbbell set" },
        { name: "Treadmills", detail: "Cardio Zone (6 Rigs)" },
      ],
      facilities: [
        { name: "AC", detail: "Full AC throughout main gym floor" },
        { name: "Hot Shower", detail: "Separated clean shower cubicles" },
        { name: "Free Wi-Fi", detail: "High-speed campus fiber" },
      ],
    },
    {
      slug: "titan",
      name: "Titan Power Sukabirus",
      address: "Gg. PGA Sukabirus No. 8",
      locationZone: LocationZone.Sukabirus,
      distance: "650m from Telkom Dormitories",
      dailyPrice: 10000,
      monthlyPrice: 95000,
      ktmDiscount: true,
      rating: 4.6,
      reviewsCount: 210,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=85&w=900",
      accent: "Most Budget-Friendly",
      description: "Pilihan budget-friendly dekat dormitory dengan free weights dan power rack untuk latihan strength.",
      openingHours: "07:00",
      closingHours: "22:00",
      equipments: [
        { name: "Power Racks", detail: "2 Power Racks" },
        { name: "Olympic Barbells", detail: "Heavy Free Weights" },
        { name: "Calisthenics Rig", detail: "Pull up & dip bars" },
      ],
      facilities: [
        { name: "Motor Area", detail: "Safe motor parking" },
        { name: "Chalk Allowed", detail: "Lifting chalk permitted" },
        { name: "Warung Next Door", detail: "Convenient meal access" },
      ],
    },
  ];

  for (const g of gymsData) {
    const gym = await prisma.gym.create({
      data: {
        ownerId: owner.id,
        slug: g.slug,
        name: g.name,
        address: g.address,
        locationZone: g.locationZone,
        distance: g.distance,
        dailyPrice: g.dailyPrice,
        monthlyPrice: g.monthlyPrice,
        ktmDiscount: g.ktmDiscount,
        rating: g.rating,
        reviewsCount: g.reviewsCount,
        image: g.image,
        accent: g.accent,
        description: g.description,
        openingHours: g.openingHours,
        closingHours: g.closingHours,
      },
    });

    // Link equipments
    for (const eq of g.equipments) {
      const eqId = equipmentMap.get(eq.name);
      if (eqId) {
        await prisma.gymEquipment.create({
          data: {
            gymId: gym.id,
            equipmentId: eqId,
            detail: eq.detail,
          },
        });
      }
    }

    // Link facilities
    for (const fac of g.facilities) {
      await prisma.gymFacility.create({
        data: {
          gymId: gym.id,
          facilityName: fac.name,
          detail: fac.detail,
        },
      });
    }
  }

  console.log("Seeding completed successfully! 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
