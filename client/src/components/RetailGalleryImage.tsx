import ArchNiche from "./ArchNiche";

type GalleryImageProps = {
  src: string;
  loading?: "eager" | "lazy";
};

/** A Retail piece in its house niche. */
export default function RetailGalleryImage({ src, loading = "lazy" }: GalleryImageProps) {
  return <ArchNiche src={src} loading={loading} className="retail-gallery-image" ornate />;
}
