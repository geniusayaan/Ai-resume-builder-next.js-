
import { EditorFormProps } from "@/lib/Types";
import GeneralInform from "./forms/GeneralInform";
import PersonalInform from "./forms/PersonalInform";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import Educationform from "./forms/Educationform";
import Skillsform from "./forms/Skillsform";
import SummaryForm from "./forms/SummaryForm";

export const steps :{
       title:string;
       component:React.ComponentType<EditorFormProps>;
       key:string;
}[]=[
    {title:"General info",component:GeneralInform,key:"general-info"},
    {title:"Personal info",component:PersonalInform,key:"personal-info"},
    {title:"Work Experience",component:WorkExperienceForm,key:"work-experience"},
    {title:"Education",component:Educationform,key:"education"},
    {title:"Skills",component:Skillsform,key:"skills"},
    {title:"Summary",component:SummaryForm,key:"summary"},





]