"use client";

import {
  BtnBold,
  BtnItalic,
  BtnStrikeThrough,
  BtnUnderline,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import "./WysiwygEditor.scss";

type Props = {
  label?: string;
  value?: string | null;
  onChange?: (event: ContentEditableEvent) => void;
};

export default function WysiwygEditor({ label, value, onChange }: Props) {
  return (
    <div style={{ display: "grid", gap: "0.5em" }}>
      {label && <span>{label}</span>}
      <div data-wysiwyg-editor-component>
        <EditorProvider>
          <Editor value={value || undefined} onChange={onChange}>
            <Toolbar>
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
            </Toolbar>
          </Editor>
        </EditorProvider>
      </div>
    </div>
  );
}
