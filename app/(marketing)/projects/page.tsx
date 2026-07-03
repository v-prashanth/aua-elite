import * as React from "react";
import { ProjectsClient } from "@/components/projects/ProjectsClient";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // Cache for 1 hour, auto-revalidated by server actions

interface ProjectImage {
  src: string;
  title: string;
  type: string;
  col?: string;
  row?: string;
}

const FALLBACK_IMAGES: ProjectImage[] = [
  { src: "/images/projects/project-wap-5.jpg",  title: "Residential Villa Installation",    type: "Residential Villa",    col: "1 / 3", row: "1 / 3" },
  { src: "/images/projects/project-wap-12.jpg", title: "Water Heater Installation",          type: "Water Heater",         col: "3 / 4", row: "1 / 2" },
  { src: "/images/projects/project-wap-22.jpg", title: "Commercial Installation",            type: "Commercial",           col: "4 / 5", row: "1 / 2" },
  { src: "/images/projects/project-wap-15.jpg", title: "Residential Installation",           type: "Residential",          col: "3 / 5", row: "2 / 3" },
  { src: "/images/projects/project-wap-18.jpg", title: "Luxury Bathroom Installation",       type: "Luxury Bathroom",      col: "1 / 2", row: "3 / 4" },
  { src: "/images/projects/ZB1.jpg",            title: "Water Softener Installation",        type: "Water Softener",       col: "2 / 4", row: "3 / 4" },
  { src: "/images/projects/project-wap-10.jpg", title: "Hotel Installation",                 type: "Hotel",                col: "4 / 5", row: "3 / 5" },
  { src: "/images/projects/project-wap-8.jpg",  title: "Apartment Installation",             type: "Apartment",            col: "1 / 3", row: "4 / 5" },
  { src: "/images/projects/ZB3.jpg",            title: "Water Treatment Installation",       type: "Water Treatment",      col: "3 / 4", row: "4 / 5" },
  { src: "/images/projects/project-wap-20.jpg", title: "Residential Villa Installation",     type: "Residential Villa",    col: "1 / 2", row: "5 / 6" },
  { src: "/images/projects/project-wap-4.jpg",  title: "Commercial Office Installation",     type: "Commercial Office",    col: "2 / 4", row: "5 / 6" },
  { src: "/images/projects/project-wap-9.jpg",  title: "Luxury Apartment Installation",      type: "Luxury Apartment",     col: "4 / 5", row: "5 / 6" },
];

export default async function ProjectsPage() {
  let displayImages: ProjectImage[] = FALLBACK_IMAGES;

  try {
    const supabase = await createClient();
    const { data: gallery, error } = await supabase
      .from("gallery_images")
      .select("image, caption, category, display_order")
      .order("display_order", { ascending: true });

    if (!error && gallery && gallery.length > 0) {
      displayImages = gallery.map((item) => ({
        src: item.image,
        title: item.caption || "Installation Photo",
        type: item.category || "Installation",
      }));
    }
  } catch (err) {
    console.warn("Failed to fetch gallery from Supabase. Falling back to local data.", err);
  }

  return (
    <ProjectsClient images={displayImages} />
  );
}
