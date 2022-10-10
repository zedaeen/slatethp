import React, { useState, useCallback } from "react";
import isHotkey from 'is-hotkey'
import { Editor, createEditor, Descendant, Transforms } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';

import { Button, Toolbar } from './components'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            { text: 'Type Here.' }
        ],
    },
  ]

const RichText = () => {
    const [editor] = useState(() => withReact(createEditor()))
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    // const renderElement = useCallback(props => <Element {...props} />, [])
   
    return (
        <Slate editor={editor} value={initialValue} >
            <Toolbar>
                <MarkButton format="bold" text="<Bold>" />
                <MarkButton format="italic" text="<Italic>" />
                <MarkButton format="underline" text="<Underline>" />
                <MarkButton format="code" text="<Code>" />
                <MarkButton format="greenyellow" text="<Green Yellow>" />
            </Toolbar>
            <Editable
                // renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                      if (isHotkey(hotkey, event as any)) {
                        event.preventDefault()
                        const mark = HOTKEYS[hotkey]
                        toggleMark(editor, mark)
                      }
                    }
                  }}
            />
        </Slate>
    )
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
  

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const MarkButton = ({ format, text }) => {
    const editor = useSlate()
    return (
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <>{text}</>
      </Button>
    )
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }

    if (leaf.greenyellow) {
        children = <span style={{color:"greenyellow"}}>{children}</span>
    }
  
    return <span {...attributes}>{children}</span>
}

export default RichText