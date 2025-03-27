import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Folder = ({explorer, handleAdd, deleteItem, handleEditNode}) => {
  const [expand, setExpand] = useState(false);
  const [icons, setIcons] = useState(false);
  const [inputVisible, setInputVisible] = useState({
    input: false,
    isFolder:null
  })
  const [inputValue, setInputValue] = useState('');
  const [edit, setEdit]= useState(false);


  function handleAddFolder(e,isFolder){
    e.stopPropagation();
    setExpand(true);
    setInputVisible({
      input: true,
      isFolder
    });
  }

  function handleInputValue(e){
    if(e.key== 'Enter' && e.target.value.trim() != ''){
      handleAdd(explorer.id, e.target.value.trim(), inputVisible.isFolder);
      setInputVisible({input: false, isFolder: null})
    }
  }

  function handleDelete(e){
    e.stopPropagation();
    deleteItem(explorer.id);
  }

  function handleEdit(){
    setInputValue(explorer.name);
    setEdit(true);
    setIcons(false)
  }

  function handleEditItem(e){
    setIcons(false)
    e.stopPropagation()
    if(e.key == 'Enter' && e.target.value.trim() !=''){
      console.log('in')
      handleEditNode(explorer.id, inputValue, explorer.isFolder);
      setEdit(false);
    }
  }

  return explorer.isFolder ?   (
   <div className=''>

     <div className='pl-2 cursor-pointer select-none flex w-60 justify-between' 
     onClick={()=> setExpand(prev => !prev)}
     onMouseEnter={()=> setIcons(true)}
     onMouseLeave={()=> setIcons(false)}
     >
      <div className='flex gap-1'>
        {
          edit ? <div className='flex gap-1'><span>📁</span> <input type='text' className='w-40 px-1' autoFocus onBlur={()=> setEdit(false)}
           value={inputValue} onChange={(e)=> setInputValue(e.target.value)}
           onKeyDown={handleEditItem}/></div>: <div>📁 {explorer.name}</div>
        }
      </div>
      {
        icons && !edit  && <div className='flex gap-1'>
                    <div onClick={(e)=>handleAddFolder(e, true)}>📁</div>
                    <div onClick={(e)=>handleAddFolder(e,false)}>📄</div>
                    {
                      explorer.id!=1 && <>
                        <div><MdDeleteOutline size={22} onClick={handleDelete}/></div>
                        <div><CiEdit size={22} onClick={handleEdit}/></div>
                      </>
                    }
                </div>
      }
     </div>
     <div className='pl-6 mt-1'>
     <div className='pl-2'>
      {
        inputVisible.input && <div>
          <span>{inputVisible.isFolder? '📁' : '📄'} </span>
              <input type='text' autoFocus onBlur={()=> setInputVisible({
              input:false,
              isFolder:null
            })}
            onKeyDown={handleInputValue}
            className='w-48 px-1'/>
        </div>
      }
     </div>
      {
        expand && explorer?.items?.map((exp)=>{
          return <Folder key={exp.id} explorer={exp} handleAdd={handleAdd} deleteItem={deleteItem} handleEditNode={handleEditNode}/>
        })
      }
      </div>
   </div>
  ):
  (<div className='pl-2 flex w-60 justify-between cursor-pointer' 
    onMouseEnter={()=> setIcons(true)}
    onMouseLeave={()=> setIcons(false)}>
    <div> { edit ? <div className='flex'><span>📄</span> <input type='text' className='w-40 px-1' autoFocus onBlur={()=> setEdit(false)}
           value={inputValue} onChange={(e)=> setInputValue(e.target.value)}
           onKeyDown={handleEditItem}/></div>: <div>📄 {explorer.name}</div>}</div>
    <div className='flex'>{
      icons && !edit && <>
          <div><MdDeleteOutline size={22} onClick={handleDelete}/></div>
          <div><CiEdit size={22} onClick={handleEdit}/></div>
      </>
      }</div>
  </div>)


}

export default Folder
