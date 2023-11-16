
import { fetchapplication, fetchdata, fetchemployerdata, fetchstatus, fetchuserdata } from '../../firebase/function'
import React,{useState, useEffect} from 'react'
import { Header } from 'screens/contents/components/gen/header'
import Navbarmenu from 'screens/contents/components/gen/navigator/navbarmenu'
import Data from 'screens/contents/components/home/data'
import Barchart from 'screens/contents/components/stats/barchart'
import Matched from 'screens/contents/components/stats/matched'
import Overview from 'screens/contents/components/stats/overview'
import SkillsData from 'screens/contents/components/stats/skillsdata'
import StatsData from 'screens/contents/components/stats/statsdata'
import Status from 'screens/contents/components/stats/status'
import UserSkillsData from 'screens/contents/components/stats/userskillsdata'
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
  const [skills, setskills] = useState<string[]>([])
  const [competencies, setcompetencies] = useState<string[]>([]);
  const [combinedUserData, setCombinedUserData] = useState<string[]>([])
  const [combinedRequirements, setCombinedRequirements] = useState<string[]>([])

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

      const filteredSkillsData = thisData.reduce((accumulator, item) => {
        const jobCombine = [
            ...(item.skills || []),
        ].filter((element): element is string => typeof element === 'string');


        accumulator.push(...jobCombine);

        return accumulator;
      }, [] as string[]);

      const filteredCompetenciesData = thisData.reduce((accumulator, item) => {
        const jobCombine = [
            ...(item.competencies || []),
        ].filter((element): element is string => typeof element === 'string');

        accumulator.push(...jobCombine);

        return accumulator;
      }, [] as string[]);

    setskills(filteredSkillsData);
    setcompetencies(filteredCompetenciesData)
    };

    const fetchStatus = async () => {
        const thisData: statusdata[] = await fetchstatus()|| [];
        const hired = thisData.filter((item) => item.employment === true)
        const nonhired = thisData.filter((item) => item.employment === false)
        sethired(hired)
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
const fetchjobdata = async () => {
  const thisdata: jobdata[] = await fetchdata("job-post") || [];
  setjobdata(thisdata);

  const resultArray: JobItem[] = thisdata
    .filter(item => item.status === true) 
    .map((item, index) => ({
      id: index,
      value: 1,
      name: item.fullname,
      job: item.jobtitle,
      skills: item.requirements,
    }));

  setfiltereddata(resultArray);

  if (skills.length > 0 && competencies.length > 0) {
      const filteredSkillsData = thisdata.reduce((accumulator, item) => {
        const jobCombine = [
          ...(item.requirements || []),
          ...(item.competencies || [])
        ].filter((element): element is string => typeof element === 'string');

        accumulator.push(...jobCombine);

        return accumulator;
      }, [] as string[]);
      
      const combinedUserData = skills.concat(competencies);

      setCombinedRequirements(filteredSkillsData);
      setCombinedUserData(combinedUserData);
    }
  };


    fetchjobdata()
    fetchApplications()
    fetchEmployer();
    fetchUser();
    fetchStatus();
  }, [skills, competencies]);

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
            <div className='stats-inner-wrapper'>
              <p>Skills and Competencies</p>
              {combinedUserData.length > 0 && combinedRequirements.length > 0 && (
              <Matched skills={combinedUserData} requirements={combinedRequirements} />
              )}
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
        <div className='data-conatiner'>
          <div className='middleinfo-container'>
            <h1>Top Skills</h1>
            <p>All Job Seeker Skills: {skills.length}</p>
            <UserSkillsData data={skills} title = 'Top 10 Skills'/>
          </div>  
          <div className='middleinfo-container'>
            <h1>Top Competencies</h1>
            <p>All Job Seeker Competencies: {competencies.length}</p>
            <UserSkillsData data={competencies} title = 'Top 10 Competencies'/>
           </div>
        </div>
      </div>
    </div>
  )
}