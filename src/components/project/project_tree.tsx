import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transformApiResponseToTreeData } from "../../utils/helpers";
const ProjectTree = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(()=>{
    const treeData = transformApiResponseToTreeData(props.ProjectMembers)
    setData(treeData);

  },[props])
  // const [data] = useState<TreeNode[]>([
  //   {
  //     expanded: true,
  //     label: "Sample Project",
  //     className: "bg-teal-500 text-white",
  //     style: { borderRadius: "12px" },
  //     children: [
  //       {
  //         expanded: false,
  //         type: "person",
  //         className: "bg-purple-500 text-white",
  //         style: { borderRadius: "12px" },
  //         data: {
  //           image:
  //             "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
  //           name: "Anna Fali",
  //           title: "CMO",
  //           uuid: "1234",
  //         },
  //         children: [
  //           {
  //             label: "Sales",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //           {
  //             label: "Marketing",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //         ],
  //       },

  //       {
  //         expanded: false,
  //         type: "person",
  //         className: "bg-purple-500 text-white",
  //         style: { borderRadius: "12px" },
  //         data: {
  //           image:
  //             "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
  //           name: "Anna Fali",
  //           title: "CMO",
  //           uuid: "1234",
  //         },
  //         children: [
  //           {
  //             label: "Sales",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //           {
  //             label: "Marketing",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //         ],
  //       },
  //       {
  //         expanded: false,
  //         type: "person",
  //         className: "bg-purple-500 text-white",
  //         style: { borderRadius: "12px" },
  //         data: {
  //           image:
  //             "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
  //           name: "Anna Fali",
  //           title: "CMO",
  //           uuid: "1234",
  //         },
  //         children: [
  //           {
  //             label: "Sales",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //           {
  //             label: "Marketing",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //         ],
  //       },
  //       {
  //         expanded: false,
  //         type: "person",
  //         className: "bg-purple-500 text-white",
  //         style: { borderRadius: "12px" },
  //         data: {
  //           image:
  //             "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
  //           name: "Anna Fali",
  //           title: "CMO",
  //           uuid: "1234",
  //         },
  //         children: [
  //           {
  //             label: "Sales",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //           {
  //             label: "Marketing",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //         ],
  //       },
  //       {
  //         expanded: false,
  //         type: "person",
  //         className: "bg-purple-500 text-white",
  //         style: { borderRadius: "12px" },
  //         data: {
  //           image:
  //             "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
  //           name: "Anna Fali",
  //           title: "CMO",
  //           uuid: "1234",
  //         },
  //         children: [
  //           {
  //             label: "Sales",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //           {
  //             label: "Marketing",
  //             className: "bg-purple-500 text-white",
  //             style: { borderRadius: "12px" },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);
  
  const nodeTemplate = (node: TreeNode) => {
    if (node.type === "person") {
      return (
        <div className="flex flex-column">
          <div className="flex flex-column align-items-center">
            <img
              alt={node.data.name}
              src={node.data.image}
              className="mb-3 w-3rem h-3rem"
            />
            <span className="font-bold mb-2">{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }

    return node.label;
  };
  if(data.length == 0){
    return <>Loading...</>
  }
  return (
    <div className="card overflow-x-auto">
      <OrganizationChart
        value={data}
        nodeTemplate={nodeTemplate}
        selectionMode="multiple"
        onSelectionChange={(e) => {
          let member_uuid = e?.data[0]?.data?.uuid;
          // navigate()
          if (member_uuid) {
            window.open(
              `/profile/${member_uuid}`,
              "_blank",
              "noopener,noreferrer"
            );
          }
        }}
      />
    </div>
  );
};
export default ProjectTree;
