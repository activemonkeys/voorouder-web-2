// apps/web/app/api/data/route.ts
import {type NextRequest} from 'next/server';
import {categories, datasets} from '@/config/datasets';
import {loadDataFile} from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);
    const category = searchParams.get('category');

    const filteredDatasets = category
      ? datasets.filter((d) => d.category === category)
      : datasets;

    const datasetsWithSchema = await Promise.all(
      filteredDatasets.map(async (dataset) => {
        const data = await loadDataFile(dataset.id);
        return {
          id: dataset.id,
          title: dataset.title,
          description: dataset.description,
          category: categories[dataset.category],
          lastUpdated: dataset.lastUpdated,
          totalRecords: data?.rows?.length || 0,
          endpoints: {
            data: `/api/data/${dataset.id}`,
            documentation: `/api/data/${dataset.id}/docs`,
          },
        };
      }),
    );

    return Response.json({
      success: true,
      categories: Object.entries(categories).map(([id, name]) => ({
        id,
        name,
      })),
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
