
function useTraverseTree(){

  function insertNode(tree, id, value, isFolder){
    if(tree.id == id){
      tree.items.unshift({
        id: new Date().getTime(),
        name: value,
        isFolder,
        items:[]
      })
    }


    let newData = tree.items.map((eachTree)=> insertNode(eachTree, id, value, isFolder))

    return {...tree, items: newData}
  }

  function deleteNode(tree, id){
    if(tree.id == id){
      return null;
    }

    if(!tree.items)
      return tree;

    let newData = tree.items.map((eachTree)=>{
      return deleteNode(eachTree, id)
    }).filter(Boolean);

    return {...tree, items: newData}
  }

  function editNode(tree, id, value){

    if(tree.id == id){
      return {...tree, name: value}
    }

    let newData = tree?.items.map((eachTree)=>{
      return editNode(eachTree, id, value);
    })

    return {...tree, items: newData}

  }

  return { insertNode, deleteNode, editNode };

}

export default useTraverseTree;