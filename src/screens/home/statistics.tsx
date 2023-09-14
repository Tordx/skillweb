
import { fetchapplication, fetchdata, fetchemployerdata, fetchstatus, fetchuserdata } from '../../firebase/function'
import React,{useState, useEffect} from 'react'
import { Header } from 'screens/contents/components/gen/header'
import Navbarmenu from 'screens/contents/components/gen/navigator/navbarmenu'
import Data from 'screens/contents/components/home/data'
import Barchart from 'screens/contents/components/stats/barchart'
import Overview from 'screens/contents/components/stats/overview'
import SkillsData from 'screens/contents/components/stats/skillsdata'
import StatsData from 'screens/contents/components/stats/statsdata'
import Status from 'screens/contents/components/stats/status'
import { DataItem, JobItem, application, applicationdata, employerdata, freelancedata, jobdata, statusdata } from 'types/interfaces'

export default function Statistics() {

  const [employerData, setEmployerData] = useState<employerdata[]>([]);
  const [freelanceData, setFreelanceData] = useState<freelancedata[]>([]);
  const [jobdata, setjobdata] = useState<jobdata[]>([])
  const [application, setapplication] = useState<applicationdata[]>([])
  const [applicationdata, setapplicationdata] = useState<application[]>([])
  const [filtereddata, setfiltereddata] = useState<JobItem[]>([])
  const [unemployed, setunemployed] = useState<freelancedata[]>([]);
  const [employed, setemployed] = useState<freelancedata[]>([]);
  const [hired, sethired] = useState<statusdata[]>([]);
  const [nonhired, setnonhired] = useState<statusdata[]>([]);

  useEffect(() => {
    const fetchEmployer = async () => {
      const thisData: employerdata[] = await fetchemployerdata() || [];
      setEmployerData(thisData);
    };

    const fetchUser = async () => {
      const thisData: freelancedata[] = await fetchuserdata() || [];
      setFreelanceData(thisData);
      const employeddata = thisData.filter((item) => item.employment === true)
      const unemployeddata = thisData.filter((item) => item.employment === false)
      setemployed(employeddata)
      setunemployed(unemployeddata)
    };

      const fetchStatus = async () => {
        const thisData: statusdata[] = await fetchstatus()|| [];
        const hired = thisData.filter((item) => item.employment === true)
        const nonhired = thisData.filter((item) => item.employment === false)
        sethired(hired)
        console.log(hired)
        setnonhired(nonhired)
    }

const fetchApplications = async () => {
  const thisData: applicationdata[] = await fetchapplication() || [];

  const countedData: application[] = thisData.reduce((acc, currentItem) => {
    const index = acc.findIndex(
      (item: application) => item.jobid === currentItem.jobid && item.jobtitle === currentItem.jobtitle
    );
    if (index !== -1) {
          (acc[index] as application).value++;
        } else {
          const newEntry: application = {
            jobid: currentItem.jobid,
            jobtitle: currentItem.jobtitle,
            value: 1,
          };
          acc.push(newEntry);
        }

    return acc;
  }, [] as application[]);
  console.log(countedData);

  setapplicationdata(countedData);
};
      const fetchjobdata =async() => {
      
      const thisdata: jobdata[] = await fetchdata("job-post")||[];
        console.log(thisdata.length)
        setjobdata(thisdata)
      const resultArray: JobItem[] = thisdata.map((item, index) => ({
        id: index, 
        value: 1, 
        name: item.fullname,
        job: item.jobtitle,
        skills: item.requirements

      }));
      setfiltereddata(resultArray)
    }

    fetchjobdata()
    fetchApplications()
    fetchEmployer();
    fetchUser();
    fetchStatus();
  }, []);

  return (
    <div className='container'>
        <Header menu={Navbarmenu}/>
      <div className='stats-wrapper'>
        <h1>Application to Employment Ratio</h1>
          <div className='stats-inner-container'>
            <div className='stats-inner-wrapper'>
              <p>Data Analysis on Employed VS. Unemployed</p>
              <Overview employed={employed.length} underemployed={0} unemployed={unemployed.length}  />
            </div>
            <div className='stats-inner-wrapper'>
              <p>Data Analysis on Hired VS. Non-hired</p>
              <Status hired={hired.length} nonhired={nonhired.length}/>
            </div>
          </div>
        <div className='bar-container'>
          <Barchart/>
        </div>
        <div className='data-conatiner'>
          <div className='middleinfo-container'>
            <h1>Job Vacancies</h1>
            <p>Total Jobs Available: {jobdata.length}</p>
            <StatsData data={filtereddata} title = 'Available Jobs'/>
          </div>  
          <div className='middleinfo-container'>
            <h1>Applicant's Skills</h1>
            <p>Total Skills: {freelanceData.length}</p>
            <SkillsData data = {applicationdata} title = 'Most jobs wanted'/>
           </div>
        </div>
      </div>
    </div>
  )
}