import { NextResponse } from 'next/server';
import { fetchTopHeadlines } from '../../../lib/newsApi';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 20;

    const newsData = await fetchTopHeadlines('us', category, limit);

    return NextResponse.json({
      success: true,
      data: newsData.articles,
      total: newsData.totalResults
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news from NewsAPI' },
      { status: 500 }
    );
  }
}
