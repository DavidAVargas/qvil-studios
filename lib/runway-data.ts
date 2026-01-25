export type RunwayPhoto = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type RunwayTheme = {
  id: string;
  name: string;
  photos: RunwayPhoto[];
};

export type RunwayShow = {
  id: string;
  slug: string;
  title: string;
  date: string;
  year: number;
  description: string;
  coverImage: string;
  themes: RunwayTheme[];
};

// Mock photos - using actual mock images with varying sizes for masonry effect
const mockPhotosSet1: RunwayPhoto[] = [
  { id: "1", src: "/images/mock-data-1.jpg", alt: "Runway look 1", width: 3, height: 4 },
  { id: "2", src: "/images/mock-data-2.jpg", alt: "Runway look 2", width: 4, height: 3 },
  { id: "3", src: "/images/mock-data-1.jpg", alt: "Runway look 3", width: 2, height: 3 },
  { id: "4", src: "/images/mock-data-2.jpg", alt: "Runway look 4", width: 3, height: 4 },
  { id: "5", src: "/images/mock-data-1.jpg", alt: "Runway look 5", width: 1, height: 1 },
  { id: "6", src: "/images/mock-data-2.jpg", alt: "Runway look 6", width: 3, height: 2 },
];

const mockPhotosSet2: RunwayPhoto[] = [
  { id: "7", src: "/images/mock-data-2.jpg", alt: "Runway look 7", width: 2, height: 3 },
  { id: "8", src: "/images/mock-data-1.jpg", alt: "Runway look 8", width: 3, height: 4 },
  { id: "9", src: "/images/mock-data-2.jpg", alt: "Runway look 9", width: 4, height: 3 },
  { id: "10", src: "/images/mock-data-1.jpg", alt: "Runway look 10", width: 3, height: 4 },
  { id: "11", src: "/images/mock-data-2.jpg", alt: "Runway look 11", width: 3, height: 2 },
  { id: "12", src: "/images/mock-data-1.jpg", alt: "Runway look 12", width: 2, height: 3 },
];

export const runwayShows: RunwayShow[] = [
  {
    id: "1",
    slug: "dark",
    title: "DARK",
    date: "September 15, 2024",
    year: 2024,
    description: "A descent into shadow. The DARK collection explores the boundaries between structure and void, where garments emerge from darkness itself.",
    coverImage: "/images/mock-runway-1.jpg",
    themes: [
      {
        id: "dark-dune",
        name: "Dune",
        photos: mockPhotosSet1,
      },
      {
        id: "dark-classic",
        name: "Classic",
        photos: mockPhotosSet2,
      },
    ],
  },
  {
    id: "2",
    slug: "paris",
    title: "PARIS",
    date: "March 22, 2024",
    year: 2024,
    description: "Romanticism reimagined. The PARIS collection brings raw emotion to the runway, blending French elegance with deconstructed silhouettes.",
    coverImage: "/images/mock-runway-2.jpg",
    themes: [
      {
        id: "paris-dune",
        name: "Dune",
        photos: mockPhotosSet2,
      },
      {
        id: "paris-classic",
        name: "Classic",
        photos: mockPhotosSet1,
      },
    ],
  },
];

export function getRunwayShow(slug: string): RunwayShow | undefined {
  return runwayShows.find((show) => show.slug === slug);
}
