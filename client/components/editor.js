import React, { useState } from 'react';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/nord.css'
import { Controlled as ControlledEditor} from 'react-codemirror2'
import { saveAs } from 'file-saver';



const Editor = (props) => {
  const {
    language,
    displayName,
    value,
    onChange,
    saveType
  } = props

  const [open, setOpen] = useState(true)

  const handleChange = (editor, data, value) => {
      onChange(value)
  }

  const save = async () => {
    const file = await new Blob([value], { type: `text/${displayName}` } )
    saveAs(file, `${saveType}`)
  }
  
  return (
    <>
      <div className={ `editor-con` } >
        <div className="editor-title"> {`Edit your ${displayName}`}
        
          <button onClick={() => setOpen(prevOpen => !prevOpen)}>
            { `${open ? 'close' : 'open'}` }
          </button> 
        </div>
        <div className= {`${displayName} ${open ? '' : 'collapsed'}`}>
          <ControlledEditor
            onBeforeChange={handleChange} 
            value={value}
            className="code-mirror-wrapper"

            options={{
              lineWrapping: true,
              lint: true,
              mode: language,
              theme: 'nord',
              lineNumbers:true,
            }}
          />
        </div>
        <div className="save" 
          download="Dockerfile" 
          onClick={save}> 
          {`Save your ${displayName}`}  
        </div>

      </div>
      
    </>
  );
}

export default Editor;