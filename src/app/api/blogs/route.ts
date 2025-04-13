// src/app/api/blogs/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Use your actual blog hostname from Hashnode
    const host = 'some1uknow.hashnode.dev'; 

    const query = `
      query Publication($host: String!) {
        publication(host: $host) {
          title
          isTeam
          posts(first: 10) {
            edges {
              node {
                title
                brief
                url
                slug
                coverImage {
                  url
                }
                publishedAt
              }
            }
          }
        }
      }
    `;

    const variables = { host };

    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors.map((e: Error) => e.message).join(', '));
    }

    const posts = result.data.publication.posts.edges.map((edge: { node: { title: string; brief: string; url: string; slug: string; coverImage: { url: string }; publishedAt: string } }) => edge.node);

    return NextResponse.json(posts);
  } catch (err) {
    console.error('Error fetching Hashnode posts:', err);
    return NextResponse.json(
      { error: 'Failed to load blog posts' },
      { status: 500 }
    );
  }
}
