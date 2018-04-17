

function isOrIsLike(originalVal, val) {
  if (typeof val === 'string') {
    originalVal = originalVal.toLowerCase();
    val = val.toLowerCase();
    
    return ((originalVal === val) || (originalVal.includes(val)));
  } else {
    return (originalVal === val);
  }
}


export function getUpdatedList(list, item, filters = null) {
  if (!list || (!!list && list.length === 0)) return null;
  if (!item) return list;

  const newItem = list.every(existingItem => item.cuid !== existingItem.cuid);
  if (!!filters && filters.length > 0) {
    const itemPassesFilter = filters.every(filter => isOrIsLike(item[`${filter.key}`], filter.value));

    if (!itemPassesFilter) return list;

    if (newItem) {
      list.push(item);

      return list;
    } else {
      list.map(existingItem => existingItem.cuid === item.cuid ? item : existingItem);

      return list;
    }
  } else {
    if (newItem) {
      list.push(item);

      return list;
    } else {
      list.map(existingItem => existingItem.cuid === item.cuid ? item : existingItem);

      return list;
    }
  }
};

export function getFilteredList(list = null, filters = null) {
  if (!list || (!!list && list.length === 0)) return null;
  if (!filters || filters.length <= 0) return list;

  const filteredList = list
    .filter(item => filters
      .every(filter => isOrIsLike(item[`${filter.key}`], filter.value)));

  return filteredList;
};

export function getItemById(list, id = null) {
  if (!list || (!!list && list.length === 0)) return null;
  if (!id) return null;

  const itemsById = getItemsById(list, id);

  return !!itemsById[0] ? itemsById[0] : null;
};

export function getItemsById(list, id = null) {
  if (!list || (!!list && list.length === 0)) return null;
  if (!id) return null;

  return list.filter(item => item.cuid === id)
}

export function getItemsWithoutId(list, id = null) {
  if (!list || (!!list && list.length === 0)) return null;
  if (!id) return null;

  return list.filter(item => item.cuid !== id)
}
