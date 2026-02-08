"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  Loader2,
  Plus,
  Trash2,
  ChevronLeft,
  ImageIcon,
  UploadCloud,
  X,
  ImagePlus,
} from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { Textarea } from "@/components/shared/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui/select";
import { toast } from "sonner";
import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/ui/image-with-fallback";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<
    { file: File; preview: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      category: "candle",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  // --- Main Image Dropzone ---
  const onDropMain = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      const file = acceptedFiles[0];
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const {
    getRootProps: getMainRootProps,
    getInputProps: getMainInputProps,
    isDragActive: isMainDragActive,
  } = useDropzone({
    onDrop: onDropMain,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
  });

  // --- Gallery Dropzone ---
  const onDropGallery = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setGalleryFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps,
    isDragActive: isGalleryDragActive,
  } = useDropzone({
    onDrop: onDropGallery,
    accept: { "image/*": [] },
  });

  const removeGalleryImage = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    // Note: In a real app involving many large files, you'd want to revokeObjectURLs to avoid memory leaks
  };

  const removeMainImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMainImageFile(null);
    setMainImagePreview(null);
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!mainImageFile) {
      toast.error("Please upload a main image");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload Main Image
      let mainImageUrl = "";
      try {
        mainImageUrl = await uploadImage(mainImageFile);
      } catch (error) {
        console.error("Main image upload failed", error);
        toast.error("Failed to upload main image");
        setIsSubmitting(false);
        return;
      }

      // 2. Upload Gallery Images
      const galleryImageUrls = [];
      for (const item of galleryFiles) {
        try {
          const url = await uploadImage(item.file);
          galleryImageUrls.push(url);
        } catch (error) {
          console.error("Gallery image upload failed", error);
        }
      }

      // 3. Create Product
      const payload = {
        name: data.name,
        category: data.category,
        price: data.price,
        image: mainImageUrl,
        stock: data.stock,
        description: data.description,
        images: galleryImageUrls,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Product created successfully");
        router.push("/admin/products");
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-cormorant font-bold text-foreground">
            Add Product
          </h1>
          <p className="text-muted-foreground">
            Create a new product for your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT COLUMN - Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Basic Details
              </h2>

              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Vanilla Dream Candle"
                  {...register("name", { required: "Name is required" })}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (R)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price cannot be negative" },
                    })}
                  />
                  {errors.price && (
                    <p className="text-xs text-destructive">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    {...register("stock", {
                      required: "Stock is required",
                      min: { value: 0, message: "Stock cannot be negative" },
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue="candle"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candle">Candles</SelectItem>
                    <SelectItem value="diffuser">Reed Diffusers</SelectItem>
                    <SelectItem value="mist">Room & Linen Mists</SelectItem>
                    <SelectItem value="bath-salt">Bath Salts</SelectItem>
                    <SelectItem value="raw-material">Raw Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Product description..."
                  rows={4}
                  {...register("description")}
                />
              </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <h2 className="text-lg font-semibold text-foreground">
                  Product Gallery
                </h2>
              </div>

              {/* Drag and Drop Zone for Gallery */}
              <div
                {...getGalleryRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[120px]",
                  isGalleryDragActive
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-muted/50",
                )}
              >
                <input {...getGalleryInputProps()} />
                <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-foreground">
                  {isGalleryDragActive
                    ? "Drop images here..."
                    : "Drag & drop gallery images here, or click to select"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports multiple images
                </p>
              </div>

              {/* Preview Grid */}
              {galleryFiles.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {galleryFiles.map((item, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden border border-border group bg-muted"
                    >
                      <ImageWithFallback
                        src={item.preview}
                        alt={`Gallery ${index}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 bg-background/80 p-1 rounded-full text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-xs"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - Main Image & Publish */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Main Image
              </h2>

              <div className="space-y-4">
                {/* Drag and Drop Zone for Main Image */}
                <div
                  {...getMainRootProps()}
                  className={cn(
                    "aspect-square relative rounded-lg border-2 border-dashed flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-colors",
                    isMainDragActive
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted/50",
                    mainImagePreview ? "border-none" : "bg-muted/30",
                  )}
                >
                  <input {...getMainInputProps()} />

                  {mainImagePreview ? (
                    <>
                      <ImageWithFallback
                        src={mainImagePreview}
                        alt="Main preview"
                        fill
                        className="object-cover"
                      />
                      {/* Overlay for removing/changing */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-medium">
                          Click or Drag to Change
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-full text-destructive hover:bg-background shadow-xs z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-4 text-muted-foreground">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium text-foreground">
                        {isMainDragActive
                          ? "Drop image here..."
                          : "Drag main image here"}
                      </p>
                      <span className="text-xs">or click to upload</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky top-6">
              <Button
                type="submit"
                className="w-full h-12 text-lg shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5 mr-2" />
                    Create Product
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
