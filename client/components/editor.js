import React from 'react';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/nord.css'
import { Controlled as ControlledEditor} from 'react-codemirror2'
import { saveAs } from 'file-saver';



const Editor = (props) => {

  const { value, onChange } = props

  const handleChange = (editor, data, value) => {
      onChange(value)
  }

  // codemirror.setSize('null', '100%')
  // const [html, setHtml] = useState('')
  const save = async () => {
    const file = await new Blob([value], { type: "text/plain" } )
    saveAs(file, 'Dockerfile')
  }
  return (
    <>
      <div className="editor-con">
        <div className="top-pane"> Edit your Dockerfile </div>
        
        <ControlledEditor

          onBeforeChange={handleChange} 
          value={value}
          className="code-mirror-wrapper"

          options={{
            lineWrapping: true,
            lint: true,
            mode: 'dockerfile',
            theme: 'nord',
            lineNumbers:true,
          }}
        />
        
        
      </div>
      <div className="editor-buttons">
        <button download="Dockerfile" onClick={save}>save</button>
        <button>configure</button>
      </div>
    </>
  );
}

export default Editor;