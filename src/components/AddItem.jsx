import React, { useState } from "react";

function AddItem(props) {
  const [item, setItem] = useState({
    title: "",
    desc: "",
    price:"0",
    imgURL:""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setItem(prevItem => {
      return {
        ...prevItem,
        [name]: value
      };
    });
  }

  

  function submitItem(event) {
    props.onAdd(item);
    setItem({
      title: "",
      desc: "",
      price:"0",
      imgURL:""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form style={{textAlign:"center"}}>
        <input
          name="title"
          onChange={handleChange}
          value={item.title}
          placeholder="Title"
        />
        <br/>
        <textarea
          name="desc"
          onChange={handleChange}
          value={item.desc}
          placeholder="Description"
          rows="3"
        />
        <br/>
        <input
          name="price"
          onChange={handleChange}
          value={item.price}
          placeholder="Price"
        />
        <br/>
        <input
          name="imgURL"
          onChange={handleChange}
          value={item.imgURL}
          placeholder="Image URL"
        />
        <br/>
        <button onClick={submitItem}>Add</button>
      </form>
    </div>
  );
}

export default AddItem;