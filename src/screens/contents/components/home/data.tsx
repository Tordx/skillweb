import React from 'react';
import { ProgressBar } from 'react-bootstrap';

type DataItem = {
  id: number;
  value: number;
  name: string;
};

type Props = {
  data: DataItem[];
  title: string;
};

export default function Data({ data, title }: Props) {

  

  return (
    <div className='data-container'>
      <div className='progress-wrapper'>
        <span className='progress-wrapper-header'>{title}</span>
        <div className='progress-table'>
          {data.map((item) => (
            <div key={item.id} className='progress-row'>
              <div className='progress-cell'>
                <span>{item.name}</span>
              </div>
                <div className='progress-bar-container'>
                  <div className='progress-bar' style={{ width: `${item.value}%` }}/>
              </div>
              <div className='progress-percent'>
                <span>{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}