import { Bold, Code, Italic, List, ListOrdered, Quote, Strikethrough } from "lucide-react"

const MenuBar = ({ editor }:any) => {
    // if (!editor?) {
    //     return null
    // }

    return (
        <div className="flex flex-row gap-2 p-3 ">
            <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                disabled={
                    !editor?.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor?.isActive('bold') ? 'is-active' : ''}
            >
                <Bold className={`stroke-white w-5 h-5 ${editor?.isActive('bold') ? 'stroke-[3.5px]' : 'stroke-2'}`} />
            </button>
            <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                disabled={
                    !editor?.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor?.isActive('italic') ? 'is-active' : ''}
            >
                <Italic className={`stroke-white w-5 h-5 ${editor?.isActive('italic') ? 'stroke-[3.5px]' : 'stroke-2'}`} />
            </button>
            <button
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                disabled={
                    !editor?.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor?.isActive('strike') ? 'is-active' : ''}
            >
                <Strikethrough className={`stroke-white w-5 h-5 ${editor?.isActive('strike') ? 'stroke-[3.5px]' : 'stroke-2'}`} />
            </button>
            <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50"></div>
            <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={editor?.isActive('bulletList') ? 'is-active' : ''}
            >
                <List className={`stroke-white w-5 h-5 ${editor?.isActive('bulletList') ? 'stroke-[3.5px]' : 'stroke-2'}`} />
            </button>
            <button
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={editor?.isActive('orderedList') ? 'is-active' : ''}
            >
                <ListOrdered className={`stroke-white w-5 h-5 ${editor?.isActive('orderList') ? 'stroke-[3.5px]' : 'stroke-2'}`} />
            </button>
            <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50"></div>
            <button
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                className={editor?.isActive('codeBlock') ? 'is-active' : ''}
            >
                <Code className={`stroke-white w-5 h-5 ${editor?.isActive('codeBlock') ? 'stroke-[3.5px]' : 'stroke-2'}`} />
            </button>
            <button
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                className={editor?.isActive('blockquote') ? 'is-active' : ''}
            >
                <Quote className={`stroke-white w-5 h-5 stroke-2 ${editor?.isActive('blockquote') ? 'fill-title' : 'fill-transparent'}`} />
            </button>
        </div>
    )
}

export default MenuBar