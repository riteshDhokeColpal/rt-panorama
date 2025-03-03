import { useNavigate } from "react-router-dom";
export const BreadCrumbContent = (breadCurmbProps) => {
    const navigation = useNavigate();
    const { val1, val2 } = breadCurmbProps;
    
    return (
        <>
            <span style={{marginRight:"5px",color:"#d3020e",fontWeight:"600",cursor:"pointer"
            }} onClick={()=>{
                navigation('/')
            }}>{val1}</span> <span style={{marginRight:"5px"}}>&gt;</span> <span>{val2}</span>
        </>
    );
};