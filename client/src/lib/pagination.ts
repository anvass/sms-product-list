export function createPages(currentPage: number, totalPages: number) {
  const maxVisiblePages = 3;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const halfBound = Math.floor(maxVisiblePages / 2);
  let startBound = currentPage - halfBound;
  let endBound = currentPage + halfBound;

  if (startBound < 1) {
    startBound = 1;
    endBound = maxVisiblePages;
  } else if (endBound > totalPages) {
    endBound = totalPages;
    startBound = totalPages - maxVisiblePages + 1;
  }

  const paginationArray = [];

  if (startBound > 1) {
    paginationArray.push('1');
    if (startBound > 2) {
      paginationArray.push('...');
    }
  }

  for (let i = startBound; i <= endBound; i++) {
    paginationArray.push(String(i));
  }

  if (endBound < totalPages) {
    if (endBound < totalPages - 1) {
      paginationArray.push('...');
    }
    paginationArray.push(String(totalPages));
  }

  return paginationArray;
}
