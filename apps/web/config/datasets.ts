// apps/web/config/datasets.ts
export interface Dataset {
  id: string; // filename zonder .json
  title: string;
  description: string;
  category:
    | 'rotterdam-bombardement-strijd-mei-1940'
    | 'rotterdam-bombardement-31-maart-1943';
  lastUpdated: string; // ISO date string
}

export const datasets: Dataset[] = [
  {
    id: 'burgerslachtoffers-bombardement-rotterdam-14-mei-1940',
    title: 'Burgerslachtoffers bombardement Rotterdam 14 mei 1940',
    description:
      'Overzicht van de burgerslachtoffers van het bombardement op Rotterdam op 14 mei 1940.',
    category: 'rotterdam-bombardement-strijd-mei-1940',
    lastUpdated: '2025-01-31',
  },
  {
    id: 'burgerslachtoffers-bombardement-hoeksche-waard-14-mei-1940',
    title: 'Burgerslachtoffers bombardement Hoeksche Waard 14 mei 1940',
    description:
      'Overzicht van de burgerslachtoffers van het bombardement op de Hoeksche Waard op 14 mei 1940.',
    category: 'rotterdam-bombardement-strijd-mei-1940',
    lastUpdated: '2025-01-31',
  },
  {
    id: 'burgerslachtoffers-oorlogsgeweld-mei-1940',
    title: 'Burgerslachtoffers van het  Hoeksche Waard 14 mei 1940',
    description:
      'Overzicht van de burgerslachtoffers die tussen 10 en 14 mei 1940 in Rotterdam en omgeving omkwamen door oorlogsgeweld anders dan het grote bombardement van 14 mei 1940.',
    category: 'rotterdam-bombardement-strijd-mei-1940',
    lastUpdated: '2025-01-31',
  },

  {
    id: 'nederlandse-militaire-slachtoffers-mei-1940',
    title: 'Nederlandse militaire slachtoffers mei 1940',
    description:
      'Overzicht van de gesneuvelde of vermiste Nederlandse militairen als gevolg van oorlogsgeweld binnen de geografische grenzen van het huidige Rotterdam en de directe omgeving in de periode 10-14 mei 1940.',
    category: 'rotterdam-bombardement-strijd-mei-1940',
    lastUpdated: '2025-01-31',
  },

  {
    id: 'duitse-militaire-slachtoffers-mei-1940',
    title: 'Duitse militaire slachtoffers mei 1940',
    description:
      'Overzicht van de gesneuvelde of vermiste Duitse militairen als gevolg van oorlogsgeweld binnen de geografische grenzen van het huidige Rotterdam en de directe omgeving in de periode 10-14 mei 1940.',
    category: 'rotterdam-bombardement-strijd-mei-1940',
    lastUpdated: '2025-01-31',
  },

  {
    id: 'britse-militaire-slachtoffers-mei-1940',
    title: 'Britse militaire slachtoffers mei 1940',
    description:
      'Overzicht van de gesneuvelde Britse militairen als gevolg van oorlogsgeweld binnen de geografische grenzen van het huidige Rotterdam en de directe omgeving in de periode 10-14 mei 1940.',
    category: 'rotterdam-bombardement-strijd-mei-1940',
    lastUpdated: '2025-01-31',
  },

  {
    id: 'slachtoffers-bombardement-rotterdam-31-maart-1943',
    title: 'Slachtoffers bombardement Rotterdam 31 maart 1943',
    description:
      'Overzicht van de slachtoffers van het bombardement op Rotterdam-West op 31 maart 1943.',
    category: 'rotterdam-bombardement-31-maart-1943',
    lastUpdated: '2025-01-31',
  },
  // Voeg hier de rest van je datasets toe indien nodig
];

export const categories = {
  'rotterdam-bombardement-strijd-mei-1940':
    'Rotterdam Bombardement en Strijd mei 1940',
  'rotterdam-bombardement-31-maart-1943':
    'Rotterdam Bombardement 31 maart 1943',
};
