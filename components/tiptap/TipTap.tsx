"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { useEffect } from "react";

const Tiptap = ({
	content,
	setContent,
	clearContentFlag,
	setClearContentFlag,
	error,
}: {
	content: string;
	setContent: any;
	clearContentFlag: boolean;
	setClearContentFlag: any;
	error?: boolean;
}) => {
	useEffect(() => {
		if (clearContentFlag) {
			editor?.commands.setContent("");
			setClearContentFlag(false);
		}
	}, [clearContentFlag]);
	const editor = useEditor({
		extensions: [StarterKit],
		editorProps: {
			attributes: {
				class: "prose !prose-white leading-5 mx-4 !text-white max-w-[200px] xs:max-w-[300px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[750px] !min-h-[300px] p-3 focus:outline-none",
			},
		},
		onUpdate: ({ editor }) => {
			setContent(editor.getHTML());
		},
		content: `${content}`,
	});
	return (
		<div className="flex flex-col gap-2">
			<div
				className={`!w-full border min-h-[350px] border-gray-300 rounded-md ${
					editor?.isFocused ? "ring-2 ring-gray-400" : "ring-transparent"
				}`}>
				<MenuBar editor={editor} />
				<EditorContent editor={editor} />
			</div>
			{error && (
				<p className="text-red-500 text-base-semibold">
					This filed can not be empty
				</p>
			)}
		</div>
	);
};
export default Tiptap;
