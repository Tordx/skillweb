import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts';
import { months } from 'screens/contents/constants/months';
import { employerdata, freelancedata, statusdata } from 'types/interfaces';
import { fetchemployerdata, fetchstatus, fetchuserdata } from '../../../../firebase/function';

type Props = {};

export default function Barchart({}: Props) {
  const [employerData, setEmployerData] = useState<employerdata[]>([]);
  const [freelanceData, setFreelanceData] = useState<freelancedata[]>([]);
  const [statusdata, setstatusdata] = useState<statusdata[]>([])

  useEffect(() => {
    const fetchEmployer = async () => {
      const thisData: employerdata[] = await fetchemployerdata() || [];
      setEmployerData(thisData);
    };

    const fetchUser = async () => {
      const thisData: freelancedata[] = await fetchuserdata() || [];
      setFreelanceData(thisData);
    };

    const fetchStatus = async () => {
      const thisData: statusdata[] = await fetchstatus()|| [];
      setstatusdata(thisData)
    } 

    fetchEmployer();
    fetchUser();
    fetchStatus()
  }, []);

const accumulateDataByMonth = (data: any[], employment: boolean) => {
  const monthData = new Array(12).fill(0); 

  data.forEach((item) => {
    if (item.timestamp !== undefined) {
      const timestamp = item.timestamp.toDate();
      const month = timestamp.getMonth();

      console.log(`Item: ${JSON.stringify(item)}`);
      console.log(`Month: ${month}`);
      console.log(`Employment Status: ${item.employment}`);

      if (item.employment === employment) {
        monthData[month] += 1; 
        console.log(`Month Data After Increment: ${JSON.stringify(monthData)}`);
      }
    }
  });

  return monthData;
};
  const employedFreelanceData = accumulateDataByMonth(freelanceData, true);
  const unemployedFreelanceData = accumulateDataByMonth(freelanceData, false);
  const employmentStatus = accumulateDataByMonth(statusdata, true)
  const unemploymentStatus = accumulateDataByMonth(statusdata, false)
  return (
    <div className='chart-container'>
      <BarChart
        xAxis={[{ scaleType: 'band', data: months }]}
        series={[
          { data: employedFreelanceData },
          { data: [0,0,0,0,0,0,0,0,0,0,0,0] },
           { data: unemployedFreelanceData },
        ]}
        width={750}
        height={400}
      />
      <BarChart
        xAxis={[{ scaleType: 'band', data: months }]}
        series={[
          { data: employmentStatus },
          { data: unemploymentStatus }
        ]}
        width={750}
        height={400}
      />
    </div>
  );
}
