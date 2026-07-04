function ItemList({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => onDelete(item.id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;