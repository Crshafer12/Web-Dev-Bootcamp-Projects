import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

function App() {
	return (
		<div>
			<h1>
				<span>emojipedia</span>
			</h1>
			<dl className="dictionary">
				{emojipedia.map((entryItem) => (
					<Entry key={entryItem.id} emoji={entryItem.emoji} name={entryItem.name} meaning={entryItem.meaning} />
				))}
			</dl>
		</div>
	);
}

export default App;
