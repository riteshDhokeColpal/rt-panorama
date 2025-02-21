import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const AdminSkillset = () => {
  let sample_data = [
    {
        "id": "1",
        "name": "Python"
    },
    {
        "id": "2",
        "name": "React"
    },
    {
        "id": "3",
        "name": "Angular"
    },
    {
        "id": "4",
        "name": "Javascript"
    },
    {
        "id": "5",
        "name": "NodeJs"
    }
];
  return (
    <>
      <div>
      <div style={{float:"right"}}>
        <Button>Add Skills</Button>

      </div>
        <DataTable
          value={sample_data}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
        >
          <Column field="id" header="Sr No"></Column>
          <Column field="name" header="Name"></Column>
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
  );
};

export default AdminSkillset;
