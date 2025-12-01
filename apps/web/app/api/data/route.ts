// apps/web/app/api/data/route.ts
import {type NextRequest} from 'next/server';
import {datasets} from '@/config/datasets';
import {loadDataFile} from '@/services/dataset-service';

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);
    const category = searchParams.get('category');

    const filteredDatasets = category
      ? datasets.filter((d) => d.category === category)
      : datasets;

    const datasetsWithSchema = await Promise.all(
      filteredDatasets.map(async (dataset) => {
        // Gebruik de service om de data te laden (cached)
        const data = await loadDataFile(dataset.id);

        return {
          id: dataset.id,
          title: dataset.title,
          description: dataset.description,
          // Voeg een check toe of categories[dataset.category] bestaat, of gebruik de key zelf
          category: dataset.category,
          lastUpdated: dataset.lastUpdated,
          totalRecords: data?.rows?.length || 0,
          endpoints: {
            data: `/api/data/${dataset.id}`,
            documentation: `/api/data/${dataset.id}/docs`,
          },
        };
      }),
    );

    // Beperk response grootte door alleen noodzakelijke metadata terug te geven
    // (We sturen hier niet de volledige 'categories' map mee, tenzij dat echt nodig is voor de UI)
    return Response.json({
      success: true,
      count: datasetsWithSchema.length,
      datasets: datasetsWithSchema,
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      {
        success: false,
        error: 'Internal server error',
      },
      {status: 500},
    );
  }
}
