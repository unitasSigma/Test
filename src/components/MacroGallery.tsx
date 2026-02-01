'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1000', title: 'Macro Paint Depth', size: 'large' },
  { url: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=1000', title: 'Wheel Perfection', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1619405264299-736f8bb14120?auto=format&fit=crop&q=80&w=1000', title: 'Interior Detailing', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1599408162162-cdb65b16954e?auto=format&fit=crop&q=80&w=1000', title: 'Beading Effect', size: 'medium' },
];

export default function MacroGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px]">
      {GALLERY_IMAGES.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`relative group overflow-hidden rounded-2xl silver-border ${
            img.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
            img.size === 'medium' ? 'md:col-span-2' : ''
          }`}
        >
          <Image
            src={img.url}
            alt={img.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={img.size === 'large'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
            <div>
              <div className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Technique: Macro</div>
              <h3 className="text-xl font-serif text-white">{img.title}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
