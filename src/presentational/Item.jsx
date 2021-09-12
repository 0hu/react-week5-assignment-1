export default function Item({
  item, name, handleClick, checkedItem,
}) {
  function handleClickButton() {
    const { name: text, id } = item;
    const value = {
      id,
      text,
    };
    handleClick(name, value);
  }

  return (
    <li>
      <button type="button" name={name} onClick={handleClickButton}>
        {item.name}
        {checkedItem && checkedItem.id === item.id ? '(V)' : null}
      </button>
    </li>
  );
}