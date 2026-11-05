import { Camera, MapPin } from "lucide-react";

export function GallerySection() {
  const photos = [
    {
      title: "Warm Blanket Distribution",
      location: "Mirpur 10, Dhaka",
      category: "Winter Relief",
      image: "/images/events/winter-relief.jpg",
    },
    {
      title: "Dhanmondi Lake Cleanliness Initiative",
      location: "Dhanmondi Lake, Dhaka",
      category: "Sanitation",
      image: "/images/events/lake-cleanup.jpg",
    },
    {
      title: "Urban Shade Sapling Plantation",
      location: "Uttara Sector 7, Dhaka",
      category: "Afforestation",
      image: "/images/events/tree-plantation.jpg",
    },
    {
      title: "Free Community Health Screening",
      location: "Mohammadpur Town Hall, Dhaka",
      category: "Healthcare",
      image: "/images/events/healthcare-camp.jpg",
    },
    {
      title: "Storybook Distribution & Tutoring",
      location: "Korail Slum, Banani, Dhaka",
      category: "Education",
      image: "/images/events/slum-education.jpg",
    },
    {
      title: "Riverbank Debris Cleanliness Drive",
      location: "Sadarghat Riverfront, Old Dhaka",
      category: "River Conservation",
      image: "/images/events/river-cleanup.jpg",
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>Moments of Community Solidarity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Action on the Ground
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Real volunteers making an authentic difference across neighborhoods in Dhaka.
          </p>
        </div>

        {/* Uniform Aspect-Ratio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs"
            >
              <div className="aspect-4/3 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Gradient Information Overlay */}
              <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                  {item.category}
                </span>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

