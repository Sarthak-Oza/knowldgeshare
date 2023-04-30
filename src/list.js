import supabase from "./supabase";
import { CATEGORIES } from "./App";

function EachList(props) {
  const { lst, list, setKnowledgeList } = props;

  async function upvoteHandler() {
    const { data: selectedList, error } = await supabase
      .from("knowledgelist")
      .update({ upvote: lst.upvote + 1 })
      .eq("id", lst.id)
      .select();

    setKnowledgeList((list) =>
      list.map((list) => (list.id === lst.id ? selectedList[0] : list))
    );
  }

  async function downvoteHandler() {
    const { data: selectedList, error } = await supabase
      .from("knowledgelist")
      .update({ downvote: lst.downvote + 1 })
      .eq("id", lst.id)
      .select();

    setKnowledgeList((list) =>
      list.map((list) => (list.id === lst.id ? selectedList[0] : list))
    );
  }

  async function wrongvoteHandler() {
    const { data: selectedList, error } = await supabase
      .from("knowledgelist")
      .update({ wrong: lst.wrong + 1 })
      .eq("id", lst.id)
      .select();

    setKnowledgeList((list) =>
      list.map((list) => (list.id === lst.id ? selectedList[0] : list))
    );
  }

  return (
    <li key={lst.id} className="list_detail">
      <p>
        {lst.text}

        <a href={lst.source} target="_blank" rel="noopener noreferrer">
          (Source)
        </a>
        <span
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find(
              (el) => el.name.toUpperCase() === lst.category.toUpperCase()
            ).color,
          }}
        >
          {lst.category}
        </span>
      </p>
      <div className="vote-button">
        <button className="vote-ind-btn" onClick={upvoteHandler}>
          👍 <strong>{lst.upvote}</strong>
        </button>
        <button className="vote-ind-btn" onClick={downvoteHandler}>
          👎 <strong>{lst.downvote}</strong>
        </button>
        <button className="vote-ind-btn" onClick={wrongvoteHandler}>
          ❌ <strong>{lst.wrong}</strong>
        </button>
      </div>
    </li>
  );
}

function KnowledgeList(props) {
  const { list, setKnowledgeList } = props;
  return (
    <section>
      <ul className="all-list">
        {list.length > 0 ? (
          list.map((eachList) => (
            <EachList
              key={eachList.id}
              lst={eachList}
              list={list}
              setKnowledgeList={setKnowledgeList}
            />
          ))
        ) : (
          <p style={{ fontWeight: "bold" }}>No records for this category!</p>
        )}
      </ul>
    </section>
  );
}

export { KnowledgeList, EachList };
