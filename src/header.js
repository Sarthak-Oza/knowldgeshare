function Header(props) {
  const { showForm, setShowForm } = props;
  const headerTitle = "Knowledge Sharing";
  return (
    <header>
      <div className="header_logo">
        <img
          src="page-icon.png"
          height="100"
          width="140"
          alt="Knowledge_logo"
          style={{ borderRadius: "50%" }}
        />
        <h1>{headerTitle}</h1>
      </div>

      <button
        className="share-btn"
        onClick={() => setShowForm((showForm) => !showForm)}
      >
        {showForm ? "CLOSE" : "SHARE"}
      </button>
    </header>
  );
}

export default Header;
