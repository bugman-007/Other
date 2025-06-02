import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';
import 'react-quill/dist/quill.snow.css';

const HtmlEditor = ({ value, onChange, height = '300px' }) => {
  const [editorMode, setEditorMode] = useState('code'); // Default to code editor since ReactQuill has issues
  const [isReact19, setIsReact19] = useState(false);
  
  // Check React version
  useEffect(() => {
    // React 19 is causing compatibility issues with ReactQuill
    try {
      const reactVersion = React.version;
      setIsReact19(reactVersion.startsWith('19'));
    } catch (e) {
      console.error('Error checking React version:', e);
      setIsReact19(true); // Default to safe mode
    }
  }, []);

  const handleChange = (content) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Card className="html-editor">
      <div className="mb-3 flex justify-between items-center">
        <span className="text-gray-700 font-medium">HTML Editor</span>
        {!isReact19 && (
          <div>
            <Button 
              type={editorMode === 'rich' ? 'primary' : 'default'}
              onClick={() => setEditorMode('rich')}
              className="mr-2"
            >
              Rich Editor
            </Button>
            <Button 
              type={editorMode === 'code' ? 'primary' : 'default'}
              onClick={() => setEditorMode('code')}
            >
              HTML Code
            </Button>
          </div>
        )}
      </div>

      {/* Always use textarea in React 19 due to compatibility issues */}
      {(editorMode === 'code' || isReact19) ? (
        <textarea
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm"
          style={{ height, resize: 'vertical' }}
          placeholder="<div>Enter your HTML here...</div>"
        />
      ) : (
        <div className="react-quill-wrapper">
          {/* Dynamically import ReactQuill to avoid issues with React 19 */}
          {React.createElement(require('react-quill').default, {
            theme: "snow",
            value: value || '',
            onChange: handleChange,
            modules: {
              toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean']
              ]
            },
            style: { height }
          })}
        </div>
      )}
      
      {editorMode === 'code' && (
        <div className="mt-3 text-xs text-gray-500">
          Edit raw HTML directly. Be careful with your syntax to avoid breaking the page layout.
        </div>
      )}
    </Card>
  );
};

export default HtmlEditor; 