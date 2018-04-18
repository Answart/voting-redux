

function arrayWithItems(array) {
  if (!array) return false;
  if (array.constructor !== Array) return false;

  return (array.length > 0);
}

function isOrIsLike(originalVal, val) {
  if (val.constructor === String) {
    originalVal = originalVal.toLowerCase();
    val = val.toLowerCase();

    return ((originalVal === val) || (originalVal.includes(val)));
  } else {
    return (originalVal === val);
  }
}

export function getListWithItem(list, item, filters = null) {
  if (!arrayWithItems(list)) return null;
  if (!item) return [ ...list ];

  const newItem = list
    .every(existingItem => item.cuid !== existingItem.cuid);

  if (arrayWithItems(filters)) {

    const itemPassesFilter = filters
      .every(filter => isOrIsLike(item[`${filter.key}`], filter.value));

    if (!itemPassesFilter) return [ ...list ];
    if (newItem) return [ ...list, { ...item } ];

    list.map(existingItem => item.cuid === existingItem.cuid ? item : existingItem);

    return [ ...list ];
  } else {
    if (newItem) return [ ...list, { ...item } ];

    list.map(existingItem => item.cuid === existingItem.cuid ? item : existingItem);

    return [ ...list ];
  }
};

export function getFilteredList(list, filters) {
  if (!arrayWithItems(list)) return null;
  if (!arrayWithItems(filters)) return list;

  const filteredList = list
    .filter(item => filters
      .every(filter => isOrIsLike(item[`${filter.key}`], filter.value))
    );

  return [ ...filteredList ];
};

export function getItemById(list, id) {
  if (!arrayWithItems(list)) return null;
  if (!id) return null;

  const itemsById = list
    .filter(item => id === item.cuid);
  const itemById = arrayWithItems(itemsById) ? itemsById[0] : null;

  return { ...itemById };
};

export function getItemsWithoutId(list, id) {
  if (!arrayWithItems(list)) return null;
  if (!id) return null;

  const itemsWithoutId = list
    .filter(item => id !== item.cuid);

  return [ ...itemsWithoutId ];
}
