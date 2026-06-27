"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Plus, X, Upload, Star, GripVertical, CheckCircle2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

interface GalleryImage {
  url: string;
  publicId: string;
  isCover: boolean;
  sortOrder: number;
}

interface GalleryEventFormProps {
  initialData?: any;
}

export default function GalleryEventForm({ initialData }: GalleryEventFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [eventDate, setEventDate] = useState(
    initialData?.eventDate ? new Date(initialData.eventDate).toISOString().split('T')[0] : ""
  );
  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);
  
  const [images, setImages] = useState<GalleryImage[]>(
    initialData?.images?.map((img: any) => ({
      url: img.url,
      publicId: img.publicId,
      isCover: img.isCover,
      sortOrder: img.sortOrder,
    })) || []
  );

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const files = Array.from(e.target.files);
      const newImages: GalleryImage[] = [];
      
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "cmi-batteries/gallery");
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Upload failed");
        }
        
        const data = await res.json();
        newImages.push({
          url: data.data.url,
          publicId: data.data.publicId,
          isCover: images.length === 0 && newImages.length === 0, // Make first image cover by default
          sortOrder: images.length + newImages.length,
        });
      }
      
      setImages((prev) => [...prev, ...newImages]);
    } catch (err: any) {
      setError(err.message || "Failed to upload images");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      const removed = newImages.splice(index, 1)[0];
      
      // If removed was cover, make the first available image the cover
      if (removed.isCover && newImages.length > 0) {
        newImages[0].isCover = true;
      }
      
      // Reassign sortOrder
      return newImages.map((img, i) => ({ ...img, sortOrder: i }));
    });
  };

  const setAsCover = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isCover: i === index,
      }))
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Reassign sortOrder
    const newImages = items.map((img, i) => ({ ...img, sortOrder: i }));
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const url = initialData 
        ? `/api/admin/gallery/${initialData.id}`
        : `/api/admin/gallery`;
        
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          eventDate,
          location,
          description,
          isFeatured,
          isPublished,
          images,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to save");
      
      router.push("/admin/gallery");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Event Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
              placeholder="e.g. Annual Dealer Meet"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Category *</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
              placeholder="e.g. Events, Product Showcase"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Event Date *</label>
            <input
              type="date"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
              placeholder="e.g. Coimbatore, TN"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none resize-none"
            placeholder="Detailed description of the event..."
          />
        </div>

        <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              isPublished ? "bg-primary border-primary" : "border-white/20 group-hover:border-primary/50"
            )}>
              {isPublished && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
            </div>
            <span className="text-white text-sm">Published</span>
            <input type="checkbox" className="hidden" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              isFeatured ? "bg-primary border-primary" : "border-white/20 group-hover:border-primary/50"
            )}>
              {isFeatured && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
            </div>
            <span className="text-white text-sm">Featured</span>
            <input type="checkbox" className="hidden" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
          </label>
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-bold text-white">Event Images</h3>
            <p className="text-gray-400 text-sm">Upload multiple images. Drag to reorder. First image is default cover.</p>
          </div>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Upload Images
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />
        </div>

        {images.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="gallery-images" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {images.map((img, index) => (
                    <Draggable key={img.publicId} draggableId={img.publicId} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={cn(
                            "relative aspect-square rounded-xl overflow-hidden group bg-[#111] border",
                            img.isCover ? "border-primary" : "border-white/10",
                            snapshot.isDragging && "shadow-2xl shadow-primary/20 z-50 ring-2 ring-primary"
                          )}
                        >
                          <Image src={img.url} alt="Gallery image" fill className="object-cover" />
                          
                          {img.isCover && (
                            <div className="absolute top-2 left-2 bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">
                              Cover
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <div {...provided.dragHandleProps} className="p-2 cursor-grab text-white/70 hover:text-white">
                              <GripVertical className="w-5 h-5" />
                            </div>
                            
                            {!img.isCover && (
                              <button
                                type="button"
                                onClick={() => setAsCover(index)}
                                className="text-xs font-medium text-white bg-white/20 hover:bg-white/40 px-3 py-1 rounded transition-colors"
                              >
                                Set Cover
                              </button>
                            )}
                            
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 text-white/50 hover:text-red-400 transition-colors p-1 bg-black/50 rounded-md"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center text-gray-500">
            No images uploaded yet.
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-colors"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
          {initialData ? "Save Changes" : "Create Event"}
        </button>
      </div>
    </form>
  );
}
