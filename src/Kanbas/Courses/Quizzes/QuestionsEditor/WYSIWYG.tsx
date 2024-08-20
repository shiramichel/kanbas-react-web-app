import { useEffect, useRef, useState } from "react";
import { LuBold, LuItalic, LuUnderline, LuListOrdered, LuList } from "react-icons/lu";
import "./styles.css"
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function WYSIWYG(
  { question, setQuestion }:
    { question: any; setQuestion: any; }
) {

  const [content, setContent] = useState(question.question);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: any) => {
    setQuestion({ ...question, question: editorRef.current?.innerHTML });
  };

  const toggleFormat = (format: string) => {
    document.execCommand(format, false);
    cleanUpInlineStyles();
    updateActiveFormats();
  };

  const toggleList = (format: string) => {
    document.execCommand("formatBlock", false, "P");
    document.execCommand(format, false);
    cleanUpInlineStyles();
    updateActiveFormats();
  };

  const toggleBlockFormat = (format: string) => {
    if (isOrderedList) {
      document.execCommand("insertOrderedList", false);
    } else if (isUnorderedList) {
      document.execCommand("insertUnorderedList", false);
    }
    document.execCommand("formatBlock", false, format);
    cleanUpInlineStyles();
    updateActiveFormats();
  };

  const cleanUpInlineStyles = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const spans = editor.querySelectorAll('span[style]');
    spans.forEach(span => {
      const parent = span.parentNode;
      while (span.firstChild) {
        parent?.insertBefore(span.firstChild, span);
      }
      parent?.removeChild(span);
    });
  };

  const updateActiveFormats = () => {
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsUnderline(document.queryCommandState("underline"));
    setIsOrderedList(document.queryCommandState("insertOrderedList"));
    setIsUnorderedList(document.queryCommandState("insertUnorderedList"));
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => {
      document.removeEventListener("selectionchange", updateActiveFormats);
    };
  }, []);

  return (
    <div id="wysiwyg">
      <div className="btn-toolbar border p-2" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group" role="group" aria-label="Basic example">
          <DropdownButton id="blocks" title="Select" variant="link">
            <Dropdown.Item onClick={() => toggleBlockFormat("H1")}>Heading 1</Dropdown.Item>
            <Dropdown.Item onClick={() => toggleBlockFormat("H2")}>Heading 2</Dropdown.Item>
            <Dropdown.Item onClick={() => toggleBlockFormat("H3")}>Heading 3</Dropdown.Item>
            <Dropdown.Item onClick={() => toggleBlockFormat("p")}>Normal</Dropdown.Item>
          </DropdownButton>
        </div>

        <div className="btn-group me-2 ms-2" role="group" aria-label="Basic example">
          <button
            type="button"
            className={`p-1 btn btn-link text-black rounded d-flex justify-content-center align-items-center ${isBold ? "btn-secondary" : ""}`}
            onClick={() => toggleFormat("bold")}
          >
            <LuBold />
          </button>
          <button
            type="button"
            className={`p-1 btn btn-link text-black rounded d-flex justify-content-center align-items-center ${isItalic ? "btn-secondary" : ""}`}
            onClick={() => toggleFormat("italic")}
          >
            <LuItalic />
          </button>
          <button
            type="button"
            className={`p-1 btn btn-link text-black rounded d-flex justify-content-center align-items-center ${isUnderline ? "btn-secondary" : ""}`}
            onClick={() => toggleFormat("underline")}
          >
            <LuUnderline />
          </button>
        </div>

        <div className="btn-group ms-2" role="group" aria-label="Basic example">
          <button
            type="button"
            className={`p-1 btn btn-link fs-5 text-black rounded d-flex justify-content-center align-items-center ${isOrderedList ? "btn-secondary" : ""}`}
            onClick={() => toggleList("insertOrderedList")}
          >
            <LuListOrdered />
          </button>
          <button
            type="button"
            className={`p-1 btn btn-link fs-5 text-black rounded d-flex justify-content-center align-items-center ${isUnorderedList ? "btn-secondary" : ""}`}
            onClick={() => toggleList("insertUnorderedList")}
          >
            <LuList />
          </button>
        </div>
      </div>

      <div
        id="wysiwyg-editor"
        className="form-control mb-2"
        ref={editorRef}
        contentEditable={true}
        role="textbox"
        aria-multiline={true}
        onInput={handleChange}
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </div>
    </div>
  );
};