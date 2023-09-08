import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { application } from 'types/interfaces';

type Props = {
  data: application[];
  title: string;
};

export default function SkillsData({ data, title }: Props) {

  

  return (
    <div className='data-container'>
      <div className='progress-wrapper'>
        <span className='progress-wrapper-header stat-header'>{title}</span>
        <div className='progress-table'>
          {data.map((item) => (
            <div key={item.jobid} className='progress-row'>
              <div className='progress-cell'>
                <span>{item.jobtitle}</span>
              </div>
              <div className='progress-percent'>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}