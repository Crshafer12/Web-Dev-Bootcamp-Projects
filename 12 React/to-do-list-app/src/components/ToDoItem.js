import React from "react";

function ToDoItem(props) {
	return (
		<div
			onClick={() => {
				props.onChecked(props.id);
			}}
		>
			<li>
				<span class="item">{props.text}</span>
			</li>
		</div>
	);
}

export default ToDoItem;
