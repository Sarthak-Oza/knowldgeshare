import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";
import Header from "./header";
import Form from "./form";
import { SideBar } from "./sidebar";
import { KnowledgeList } from "./list";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      // Load content from the DB only when form is closed or pressed submit button
      if (!showForm) {
        async function loadList() {
          setIsLoading(true);

          if (currentCategory === "all") {
            const { data: knowledgelist, error } = await supabase
              .from("knowledgelist")
              .select("*")
              .order("id", { ascending: false })
              .limit(20);
            setKnowledgeList(knowledgelist);

            setIsLoading(false);
          } else {
            const { data: knowledgelist, error } = await supabase
              .from("knowledgelist")
              .select("*")
              .eq("category", currentCategory)
              .order("id", { ascending: false })
              .limit(5);
            setKnowledgeList(knowledgelist);

            setIsLoading(false);
          }
        }
        loadList();
      }
    },
    [showForm, currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <Form setShowForm={setShowForm} knowledgeList={knowledgeList} setKnowledgeList = {setKnowledgeList}/>
      ) : null}

      <main>
        <SideBar setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <p className="loading-message">Loading....</p>
        ) : (
          <KnowledgeList
            list={knowledgeList}
            setKnowledgeList={setKnowledgeList}
          />
        )}
      </main>
    </>
  );
}

export default App;
export { CATEGORIES };
