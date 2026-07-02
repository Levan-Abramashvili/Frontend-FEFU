import landmarks from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function BuildingsGrid() {
  const rows: GridRowsProp = landmarks;
  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1},
    { field: 'Тематика', flex: 0.5},
    { field: 'Местонахождение', flex: 0.5},
    { field: 'Год открытия', flex: 0.5},
    { field: 'Посещаемость в год' },
  ];

  return (
    <Container maxWidth="xl" sx={{height: '700px', mt: '20px'}}>
        <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            showToolbar={true}
        />
    </Container>
   );
}
export default BuildingsGrid;