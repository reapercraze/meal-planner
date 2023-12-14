import React from "react";
import '../styles/CreatePlan.css';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../utils/make_request";

export function CreatePlan() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();

    await makeRequest("/create_plan/", "post", {title});
    // TODO make sure request succeeded

    navigate(-1);
  }

  return (
    <div>
      <h2>New Meal Plan</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
          </label>
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}