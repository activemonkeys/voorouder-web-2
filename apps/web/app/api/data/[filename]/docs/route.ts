// apps/web/app/api/data/[filename]/docs/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {categories, datasets} from '@/config/datasets';
import {loadDataFile} from '@/services/dataset-service';

type Params = Promise<{filename: string}>;

export async function GET(request: NextRequest, {params}: {params: Params}) {
  const resolvedParams = await params;
  const {filename} = resolvedParams;

  try {
    const dataset = datasets.find((d) => d.id === filename);
    if (!dataset) {
      return NextResponse.json(
        {success: false, error: 'Dataset not found'},
        {status: 404},
      );
    }

    const data = await loadDataFile(filename);
    if (!data) {
      return NextResponse.json(
        {success: false, error: 'Data file not found or invalid'},
        {status: 404},
      );
    }

    const firstField = data.columns[0]?.field || 'veldnaam';

    return NextResponse.json({
      success: true,
      dataset: {
        id: dataset.id,
        title: dataset.title,
        description: dataset.description,
        category: categories[dataset.category] || dataset.category,
        lastUpdated: dataset.lastUpdated,
        schema: data.columns.map((col) => col.field),
        totalRecords: data.rows.length,
      },
      endpoints: {
        base: `/api/data/${filename}`,
        examples: {
          all: `/api/data/${filename}`,
          filtered: `/api/data/${filename}?${firstField}=voorbeeld`,
          paginated: `/api/data/${filename}?page=1&pageSize=25`,
        },
      },
      usage: {
        filtering: {
          description: 'Filter resultaten door query parameters toe te voegen',
          fields: data.columns.map((col) => col.field),
          example: `/api/data/${filename}?achternaam=Jansen&geboorteplaats=Rotterdam`,
        },
        pagination: {
          description: 'Pagineer resultaten met page en pageSize parameters',
          defaultPageSize: 10,
          example: `/api/data/${filename}?page=2&pageSize=25`,
        },
      },
    });
  } catch (error) {
    console.error('Error handling dataset request:', error);
    return NextResponse.json(
      {success: false, error: 'Internal server error'},
      {status: 500},
    );
  }
}
