import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAtom } from 'jotai';
import { IsMyprofileDataAtom } from '../../../atoms/my_profile';
import { Button } from 'primereact/button';
const AdminProjects = () =>{
  const [isMyProfile] = useAtom(IsMyprofileDataAtom);

    let sample_data =[
        {
            "sr_no": 1,
            "name": "Project Alpha",
            "start_date": "2023-01-10",
            "end_date": "2023-03-15",
            "repo": "https://github.com/yourusername/project-alpha"
        },
        {
            "sr_no": 2,
            "name": "Project Beta",
            "start_date": "2023-02-01",
            "end_date": "2023-04-20",
            "repo": "https://github.com/yourusername/project-beta"
        },
        {
            "sr_no": 3,
            "name": "Project Gamma",
            "start_date": "2023-03-05",
            "end_date": "2023-05-18",
            "repo": "https://github.com/yourusername/project-gamma"
        },
        {
            "sr_no": 4,
            "name": "Project Delta",
            "start_date": "2023-04-12",
            "end_date": "2023-06-25",
            "repo": "https://github.com/yourusername/project-delta"
        },
        {
            "sr_no": 5,
            "name": "Project Epsilon",
            "start_date": "2023-05-20",
            "end_date": "2023-07-30",
            "repo": "https://github.com/yourusername/project-epsilon"
        }
    ]
    return <>
    <div style={{float:"right"}}>
        <Button>Add Project</Button>

      </div>
        <div>
        <DataTable value={sample_data} tableStyle={{ minWidth: '50rem' }}  paginator
          rows={10}>
                <Column field="sr_no" header="Sr"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="start_date" header="Start Date"></Column>
                <Column field="end_date" header="End Date"></Column>
                <Column field="repo" header="End Date" body={(row)=>{
                    return <><a href={row.repo}>url</a></>
                }}></Column>

                <Column field="" header="Action" body={() => {
                return (
                  <>
                    <i
                      className="pi pi-pencil"
                      style={{ color: "#d3020e",cursor:"pointer" }}
                    ></i>
                    <i
                      className="pi pi-trash"
                      style={{
                        color: "#d3020e",
                        marginLeft: "10px",cursor:"pointer"
                      }}
                    ></i>
                  </>
                );
              }}></Column>
            </DataTable>
        </div>
    </>
}

export default AdminProjects