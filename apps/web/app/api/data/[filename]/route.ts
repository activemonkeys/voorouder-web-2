// apps/web/app/api/data/[filename]/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {filterData, loadDataFile, paginateData} from '@/lib/api-utils';
import {ApiResponse, Column} from '@/types/api';

type Params = Promise<{filename: string}>;

export async function GET(request: NextRequest, {params}: {params: Params}) {
  const resolvedParams = await params;
  const {filename} = resolvedParams;

  try {
    const {searchParams} = new URL(request.url);

    const data = await loadDataFile(filename);
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: 'Data file not found',
        } as ApiResponse,
        {status: 404},
      );
    }

    const filters: Record<string, string> = {};
    data.columns.forEach((column: Column) => {
      // Type toegevoegd
      const value = searchParams.get(column.field);
      if (value) {
        filters[column.field] = value;
      }
    });

    const filteredData = filterData(data.rows, filters);

    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const paginatedData = paginateData(filteredData, page, pageSize);

    return NextResponse.json({
      success: true,
      data: {
        fields: data.columns.map((col: Column) => col.field), // Type toegevoegd
        rows: paginatedData,
      },
      total: filteredData.length,
      page,
      pageSize,
    } as ApiResponse);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      } as ApiResponse,
      {status: 500},
    );
  }
}
