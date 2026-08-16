// Shared project data — image folders are real JAC project photography.
// Location, coating system, finish, and description are editable placeholders
// until JAC supplies the real facts for each project. Do not present these
// placeholder fields as confirmed facts.

export interface Project {
  slug: string;
  folder: string;
  title: string;
  spaceType: string;
  category: 'garage' | 'metallic' | 'patio' | 'pool' | 'commercial' | 'shop';
  location: string;
  system: string;
  finish: string;
  description: string;
}

export const projects: Project[] = [
  {
    slug: 'modern-garage',
    folder: '01-modern-garage',
    title: 'Modern Garage Floor',
    spaceType: 'Residential Garage',
    category: 'garage',
    location: '[City, Texas — add project location]',
    system: '[Coating system — add system used]',
    finish: '[Finish description — add details]',
    description: '[Add a description of this project — what the customer needed, the condition of the existing concrete, the preparation performed, and the finished result.]',
  },
  {
    slug: 'metallic-showroom',
    folder: '02-metallic-showroom',
    title: 'Metallic Showroom Garage',
    spaceType: 'Showroom-Style Garage',
    category: 'metallic',
    location: '[City, Texas — add project location]',
    system: '[Coating system — add system used]',
    finish: '[Finish description — add details]',
    description: '[Add a description of this project — what the customer needed, the condition of the existing concrete, the preparation performed, and the finished result.]',
  },
  {
    slug: 'backyard-patio',
    folder: '03-backyard-patio',
    title: 'Backyard Patio',
    spaceType: 'Outdoor Patio',
    category: 'patio',
    location: '[City, Texas — add project location]',
    system: '[Coating system — add system used]',
    finish: '[Finish description — add details]',
    description: '[Add a description of this project — what the customer needed, the condition of the existing concrete, the preparation performed, and the finished result.]',
  },
  {
    slug: 'commercial-warehouse',
    folder: '04-commercial-warehouse',
    title: 'Commercial Warehouse Floor',
    spaceType: 'Commercial Warehouse',
    category: 'commercial',
    location: '[City, Texas — add project location]',
    system: '[Coating system — add system used]',
    finish: '[Finish description — add details]',
    description: '[Add a description of this project — what the customer needed, the condition of the existing concrete, the preparation performed, and the finished result.]',
  },
  {
    slug: 'auto-shop',
    folder: '05-auto-shop',
    title: 'Auto Shop Floor',
    spaceType: 'Auto Service Shop',
    category: 'shop',
    location: '[City, Texas — add project location]',
    system: '[Coating system — add system used]',
    finish: '[Finish description — add details]',
    description: '[Add a description of this project — what the customer needed, the condition of the existing concrete, the preparation performed, and the finished result.]',
  },
  {
    slug: 'triple-car-garage',
    folder: '06-triple-car-garage',
    title: 'Triple-Car Garage',
    spaceType: 'Residential Garage',
    category: 'garage',
    location: '[City, Texas — add project location]',
    system: '[Coating system — add system used]',
    finish: '[Finish description — add details]',
    description: '[Add a description of this project — what the customer needed, the condition of the existing concrete, the preparation performed, and the finished result.]',
  },
  {
    slug: 'pool-deck',
    folder: '07-pool-deck',
    title: 'Pool Deck',
    spaceType: 'Pool Deck',
    category: 'pool',
    location: '[City, Texas — add project location]',
    system: '[Coating system — add system used]',
    finish: '[Finish description — add details]',
    description: '[Add a description of this project — what the customer needed, the condition of the existing concrete, the preparation performed, and the finished result.]',
  },
  {
    slug: 'metallic-basement',
    folder: '08-metallic-basement',
    title: 'Metallic Basement Floor',
    spaceType: 'Residential Basement',
    category: 'metallic',
    location: '[City, Texas — add project location]',
    system: '[Coating system — add system used]',
    finish: '[Finish description — add details]',
    description: '[Add a description of this project — what the customer needed, the condition of the existing concrete, the preparation performed, and the finished result.]',
  },
];

export function projectImagePath(project: Project, file: string): string {
  return `/images/projects/${project.folder}/${file}`;
}
