import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function main() {
 const host = await db.user.upsert({ where:{email:'organizer@evento.app'}, update:{}, create:{email:'organizer@evento.app',name:'EVENTO Hosts',role:'ORGANIZER'} });
 await db.user.upsert({ where:{email:'customer@evento.app'}, update:{}, create:{email:'customer@evento.app',name:'EVENTO Guest'} });
 const profile = await db.organizerProfile.upsert({ where:{userId:host.id}, update:{}, create:{userId:host.id,displayName:'EVENTO Hosts',bio:'Sample Nairobi event and tour host'} });
 const parties = await db.category.upsert({ where:{name:'Parties'}, update:{}, create:{name:'Parties'} });
 const concerts = await db.category.upsert({ where:{name:'Concerts'}, update:{}, create:{name:'Concerts'} });
 const safari = await db.category.upsert({ where:{name:'Safari Day Trips'}, update:{}, create:{name:'Safari Day Trips'} });
 const events = [
  {id:'evt-party-1',title:'Nairobi Neon Nights',categoryId:parties.id,location:'Westlands, Nairobi',startsAt:new Date('2026-11-14T19:00:00+03:00'),capacity:500,organizerId:profile.id},
  {id:'evt-party-2',title:'Umoja Saturday Bash',categoryId:parties.id,location:'Umoja, Nairobi',startsAt:new Date('2026-11-28T18:00:00+03:00'),capacity:350,organizerId:profile.id},
  {id:'evt-concert-1',title:'Nairobi Live Sessions',categoryId:concerts.id,location:'Kasarani, Nairobi',startsAt:new Date('2026-12-05T16:00:00+03:00'),capacity:2000,organizerId:profile.id},
  {id:'evt-concert-2',title:'Sunset Afrobeat Festival',categoryId:concerts.id,location:'Ngong Racecourse, Nairobi',startsAt:new Date('2026-12-19T14:00:00+03:00'),capacity:3000,organizerId:profile.id}
 ];
 for (const event of events) await db.event.upsert({where:{id:event.id},update:event,create:event});
 await db.tour.upsert({where:{id:'tour-maasai-mara'},update:{title:'Maasai Mara Day Tour',description:'Full-day Maasai Mara wildlife experience.',categoryId:safari.id,durationMinutes:1440,meetingPoint:'Nairobi CBD pickup point',groupSize:7,price:15000,organizerId:profile.id},create:{id:'tour-maasai-mara',title:'Maasai Mara Day Tour',description:'Full-day Maasai Mara wildlife experience.',categoryId:safari.id,durationMinutes:1440,meetingPoint:'Nairobi CBD pickup point',groupSize:7,price:15000,organizerId:profile.id}});
 console.log('Seeded 4 events + 1 tour');
}
main().finally(()=>db.$disconnect());
