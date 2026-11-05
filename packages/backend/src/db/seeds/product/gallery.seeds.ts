import gallerySeeds from './gallery.seeds.json' with { type: 'json' };

export type GallerySeed = (typeof gallerySeeds)[number];

export { gallerySeeds };
