const List = {
  add: function(array, item) {
    return [
      ...array,
      item,
    ];
  },

  replace: function(array, item, id = 'id') {
    const idx = array.findIndex((el) => el[id] === item[id]);

    if (!idx) this.add(array, item);

    return [
      ...array.slice(0, idx),
      item,
      ...array.slice(idx + 1),
    ];
  },
};

export default List;
