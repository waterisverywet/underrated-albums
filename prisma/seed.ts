// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample artists
  const artist1 = await prisma.artist.create({
    data: {
      spotifyId: 'sample-artist-1',
      name: 'Luna Waves',
      monthlyListeners: 45230,
      genres: ['Electronic', 'Ambient', 'Downtempo'],
      imageUrl: 'https://placehold.co/400x400/1DB954/FFFFFF/png?text=Luna+Waves',
      popularity: 35,
    },
  });

  const artist2 = await prisma.artist.create({
    data: {
      spotifyId: 'sample-artist-2',
      name: 'Cosmic Drifters',
      monthlyListeners: 62140,
      genres: ['Indie Rock', 'Dream Pop'],
      imageUrl: 'https://placehold.co/400x400/1DB954/FFFFFF/png?text=Cosmic+Drifters',
      popularity: 42,
    },
  });

  // Create sample albums
  await prisma.album.create({
    data: {
      spotifyId: 'sample-album-1',
      title: 'Midnight Echoes',
      artistId: artist1.id,
      releaseDate: new Date('2024-01-15'),
      totalTracks: 9,
      popularity: 28,
      imageUrl: 'https://placehold.co/400x400/1DB954/FFFFFF/png?text=Album+1',
      albumType: 'album',
    },
  });

  await prisma.album.create({
    data: {
      spotifyId: 'sample-album-2',
      title: 'Velvet Dreams',
      artistId: artist2.id,
      releaseDate: new Date('2023-09-22'),
      totalTracks: 11,
      popularity: 34,
      imageUrl: 'https://placehold.co/400x400/1DB954/FFFFFF/png?text=Album+2',
      albumType: 'album',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
