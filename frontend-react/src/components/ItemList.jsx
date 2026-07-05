function ItemList({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {item.name}
          <button onClick={() => onDelete(item._id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;