import { getCurrentUser } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();


// src/app/api/recommendations/route.ts
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const genre = searchParams.get("genre");
    const year = searchParams.get("year");
    const limit = parseInt(searchParams.get("limit") || "24");
    const seed = searchParams.get("seed"); // Random seed for shuffling
    
    // Build query
    const query: any = {
      where: {
        artist: {
          monthlyListeners: {
            lt: 150000,
          },
        },
      },
      include: {
        artist: true,
      },
    };
    
    // Add filters if provided
    if (genre && genre !== "All Genres") {
      query.where.artist.genres = {
        has: genre,
      };
    }
    
    if (year && year !== "Release Year") {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      
      query.where.releaseDate = {
        gte: startDate,
        lte: endDate,
      };
    }
    
    // For random results, get more albums than needed and then shuffle
    const totalToFetch = Math.min(limit * 3, 100); // Fetch up to 3x the limit, but max 100
    query.take = totalToFetch;
    
    // Add random ordering if seed is provided
    if (seed) {
      // Prisma doesn't support true random ordering, so we'll shuffle after fetching
      query.orderBy = {
        popularity: 'desc', // Order by popularity as a starting point
      };
    }
    
    // Get recommendations
    let recommendations = await prisma.album.findMany(query);
    
    // Shuffle the results if seed is provided
    if (seed && recommendations.length > limit) {
      // Simple Fisher-Yates shuffle
      for (let i = recommendations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [recommendations[i], recommendations[j]] = [recommendations[j], recommendations[i]];
      }
      // Take only the number requested
      recommendations = recommendations.slice(0, limit);
    } else if (recommendations.length > limit) {
      // If not shuffling, just take the first 'limit' items
      recommendations = recommendations.slice(0, limit);
    }
    
    // Record these recommendations if user is logged in
    const user = await getCurrentUser();
    if (user) {
      for (const album of recommendations) {
        await prisma.albumRecommendation.upsert({
          where: {
            userId_albumId: {
              userId: user.id,
              albumId: album.id,
            },
          },
          update: {
            recommendedAt: new Date(),
            score: 1.0,
          },
          create: {
            userId: user.id,
            albumId: album.id,
            score: 1.0,
          },
        });
      }
    }
    
    return Response.json(recommendations);
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return Response.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
