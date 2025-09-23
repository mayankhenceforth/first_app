"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllCategory } from "@/actions/category";
import { Swiper, SwiperSlide } from "swiper/react";
import { } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategorySlider = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <Swiper
        modules={[]}
        spaceBetween={15}
        slidesPerView={2}
        navigation
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <Link href={`/category/${cat._id}`} className="flex flex-col items-center gap-2">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm text-center truncate">{cat.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
