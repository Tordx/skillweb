import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { application } from 'types/interfaces';

type Props = {
  data: application[];
  title: string;
  limit?: number;
};

export default function SkillsData({ data, title, limit = 10 }: Props) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const limitedData = sortedData.slice(0, limit);

  return (
    <div className='data-container skills-wrapper'>
      <div className='progress-wrapper'>
        <h4 className='progress-wrapper-header stat-header'>{title}</h4>
        <div className='progress-table'>
          {limitedData.map((item) => (
            <div key={item.jobid} className='progress-row'>
              <div className='progress-cell skills-text'>
                <span>{item.jobtitle}</span>
              </div>
              <div className='progress-percent skills-text'>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
