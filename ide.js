const editor = document.getElementById('codeEditor');
const lines = document.getElementById('lineNumbers');
const downloadBtn = document.getElementById('downloadBtn');

function updateLineNumbers(){
  const count = editor.value.split('\n').length;
  lines.innerHTML = Array.from({length: count}, (_, i) => i+1).join('\n');
}

editor.addEventListener('input', updateLineNumbers);
updateLineNumbers();

downloadBtn.addEventListener('click', ()=>{
  const blob = new Blob([editor.value], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'code.py';
  a.click();
  URL.revokeObjectURL(url);
});
