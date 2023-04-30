import { useState } from "react";
import { CATEGORIES } from "./App";
import supabase from "./supabase";
import validator from "validator";

function Form(props) {
  const { setShowForm, knowledgeList, setKnowledgeList } = props;
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  function formSubmit(e) {
    e.preventDefault();

    if (text && source && category && validator.isURL(source)) {
      async function insertData() {
        const { data: insertedRow, error } = await supabase
          .from("knowledgelist")
          .insert([{ text: text, source: source, category: category }])
          .select();

        setKnowledgeList((knowledgeList) => [insertedRow[0], ...knowledgeList]);
      }

      insertData();

      setText("");
      setSource("");
      setCategory("");

      setShowForm(false);
    }
  }

  return (
    <form onSubmit={formSubmit}>
      <input
        type="text"
        className="share-text"
        placeholder="Share something.."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span style={{ fontWeight: "bold" }}>
        {200 - text.length >= 0 ? 200 - text.length : "Limit Exceeded"}
      </span>

      <input
        type="text"
        placeholder="Soruce link"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select
        name=""
        id=""
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Choose a category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button disabled={text.length <= 200 ? false : true}>Submit</button>
    </form>
  );
}

export default Form;
