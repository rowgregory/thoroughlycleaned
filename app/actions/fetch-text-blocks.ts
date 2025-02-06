export async function fetchTextBlocks(pageTypes: any) {
  const serializedPageTypes = pageTypes?.join?.(",");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/text-block/fetch-page-specific-text-blocks/${serializedPageTypes}`
    );
    const data = res.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching text blocks");
  }
}
