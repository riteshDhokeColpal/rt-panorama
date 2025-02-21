import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const SkillsetModal = (props) => {
  return (
    <>
      <div>
        <Button style={{marginBottom:"1rem"}}>Add new Skill</Button>
        <div>
          <DataTable value={props.skills} tableStyle={{ minWidth: "44rem" }}>
            <Column
              field=""
              header="Sr"
              body={(rowData, options) => {
                return <>{options.rowIndex + 1}</>; // Adding 1 to rowIndex for 1-based index
              }}
            //   style={{ width: "2rem" }}
            ></Column>
            <Column
              field="name"
              header="Skills"
            //   style={{ width: "2rem" }}
            ></Column>
            <Column
              field=""
              header="Action"
              body={() => {
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
              }}
            //   style={{ width: "1rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default SkillsetModal;
