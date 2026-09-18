export type ChapterRegion = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const rowGap = 360;
const columnGap = 420;
const connectorGap = 20;

// Keep the two-column reading order, but let each row grow with its content.
export function arrangeChapters<T extends ChapterRegion>(
  chapters: readonly T[],
  heights: Readonly<Record<string, number>> = {},
): T[] {
  const arranged: T[] = [];
  const left = chapters[0]?.x ?? 0;
  const columnWidth = Math.max(
    0,
    ...chapters
      .filter((_, index) => index % 2 === 0)
      .map((chapter) => chapter.w),
  );
  let y = chapters[0]?.y ?? 0;
  for (let index = 0; index < chapters.length; index += 2) {
    const row = chapters.slice(index, index + 2).map((chapter, column) => {
      const measured = heights[chapter.id];
      return {
        ...chapter,
        x: left + column * (columnWidth + columnGap),
        y,
        h: Number.isFinite(measured)
          ? Math.max(chapter.h, Math.ceil(measured))
          : chapter.h,
      };
    });
    arranged.push(...row);
    y += Math.max(...row.map((chapter) => chapter.h)) + rowGap;
  }
  return arranged;
}

export function canvasBounds(chapters: readonly ChapterRegion[]) {
  if (!chapters.length) return { x: 0, y: 0, w: 1, h: 1 };
  const x = Math.min(...chapters.map((chapter) => chapter.x)) - 50;
  const y = Math.min(...chapters.map((chapter) => chapter.y)) - 50;
  return {
    x,
    y,
    w: Math.max(...chapters.map((chapter) => chapter.x + chapter.w)) + 50 - x,
    h: Math.max(...chapters.map((chapter) => chapter.y + chapter.h)) + 50 - y,
  };
}

export function chapterConnections(chapters: readonly ChapterRegion[]) {
  return chapters.slice(0, -1).map((from, index) => {
    const to = chapters[index + 1];
    if (index % 2 === 0) {
      const y = from.y + Math.min(from.h, to.h) / 2;
      const startX = from.x + from.w + connectorGap;
      const endX = to.x - connectorGap;
      return {
        id: `${from.id}-${to.id}`,
        path: `M${startX} ${y} H${endX}`,
        labelX: (startX + endX) / 2,
        labelY: y - 18,
      };
    }
    const rowBottom = Math.max(
      from.y + from.h,
      chapters[index - 1].y + chapters[index - 1].h,
    );
    const laneY = (rowBottom + to.y) / 2;
    const fromX = from.x + from.w / 2;
    const toX = to.x + to.w / 2;
    return {
      id: `${from.id}-${to.id}`,
      path: `M${fromX} ${from.y + from.h + connectorGap} V${laneY} H${toX} V${to.y - connectorGap}`,
      labelX: (fromX + toX) / 2,
      labelY: laneY - 18,
    };
  });
}
