import './App.css';
import { useState, useEffect } from 'react';
// import { FilterableMultiSelect } from 'carbon-components-react';
import { DataTable, TableHeader, TableToolbar, TableToolbarContent, TableToolbarSearch, TableSelectRow, Button } from 'carbon-components-react';
import Project from './assets/MOCK_DATA.json';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} = DataTable;

const headers = [
  {
    key: 'id',
    header: 'Project ID'
  },
  {
    key: 'projectName',
    header: 'Project Name'
  },
  {
    key: 'projectStatus',
    header: 'Current Status'
  },
]
function App() {

  const [projectArr, setProjectArr] = useState(Project.ProjectDataArr);
  const [projectsList, setProjectsList] = useState("");
  const [searchTerm,setSearchTerm] = useState('')
  const [selectedItems,setSelectedItems] = useState('')

  // const onInputChange = () => {
  //   (e) => setSearchTerm(e.target.value)
  // }
  const buttonAction = (selectedRows) => {
    console.log(selectedItems);
  }

  useEffect(() => {
    if(searchTerm.length === 0){
      setProjectArr(Project.ProjectDataArr)
    } else {
      const searchedObjects = []
      projectArr.forEach((singleProject, index) => {
        Object.values(singleProject).every((onlyId, valIndex, projectObj) => {

          if(projectObj.toString().toLowerCase().includes(searchTerm.toLowerCase())){
            searchedObjects.push(singleProject)
            return;
          }
        })
      })
      setProjectArr(searchedObjects) 
    }
  }, [searchTerm])

  return (

  <DataTable 
    isSortable={true}
    rows={projectArr} 
    headers={headers}
    render={({ rows, headers, getHeaderProps, getSelectionProps, selectedRows }) => (
      <TableContainer title="DataTable">
        <TableToolbar>
          <TableToolbarContent>
            <TableToolbarSearch onChange={(e) => setSearchTerm(e.target.value)} />
          </TableToolbarContent>
          <TableToolbarContent>
            <Button onClick={buttonAction()}>Link Projects</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableSelectRow {...getSelectionProps({row})}/>
                  {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}>

  </DataTable>
  );
}

export default App;
