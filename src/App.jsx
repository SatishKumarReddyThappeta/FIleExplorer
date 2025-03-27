import React, { useState } from 'react';
import explorer from './data/folderData';
import Folder from './components/Folder';
import useTraverseTree from './hooks/use-traverse-tree';

const App = () => {
  const [data, setData] = useState(explorer);

  const { insertNode, deleteNode, editNode} = useTraverseTree();

  const handleAdd =(id, value, isFolder)=>{
    let newData = insertNode(data, id, value, isFolder);
    setData(newData);
  }

  const deleteItem =(id)=>{
    const newData = deleteNode(data,id);
    setData(newData);
  }

  const handleEditNode=(id, value, isFolder)=>{
    const newData = editNode(data, id, value);
    setData(newData);
  }

  return (
    <div>
      <Folder explorer={data} handleAdd={handleAdd} deleteItem={deleteItem} handleEditNode={handleEditNode}/>
    </div>
  )
}

export default App