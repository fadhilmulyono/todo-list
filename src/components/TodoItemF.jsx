import React from 'react';

const TodoItemF = () => {

    const deleteBtnHandler = () => {
        alert("Anda memencet button DELETE");
    }

    const btnHandler = (type) => {
        alert(`Anda memencet button ${type}`)
    }

    return (
        <div className="my-1 d-flex flex-row justify-content-between todo-item-container align-items-center">
        Makan
        <div>
            <button onClick={deleteBtnHandler} className="btn btn-danger">Delete</button>
            <button onClick={() => btnHandler("COMPLETE")} className="btn btn-success">Complete</button>
        </div>
      </div>
    )
}

export default TodoItemF;