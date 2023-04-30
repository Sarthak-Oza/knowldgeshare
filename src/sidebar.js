import { CATEGORIES } from "./App";

function SidebarButton(props) {
  const { cat, setCurrentCategory } = props;
  return (
    <li>
      <button
        className="buttons"
        style={{ backgroundColor: cat.color }}
        onClick={() => setCurrentCategory(cat.name)}
      >
        {cat.name.toUpperCase()}
      </button>
    </li>
  );
}

function SideBar(props) {
  const { setCurrentCategory } = props;
  return (
    <aside>
      <ul>
        <li>
          <button
            className="buttons"
            style={{ backgroundColor: "#5F264A" }}
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <SidebarButton
            key={cat.name}
            cat={cat}
            setCurrentCategory={setCurrentCategory}
          />
        ))}
      </ul>
    </aside>
  );
}

export { SideBar, SidebarButton };
