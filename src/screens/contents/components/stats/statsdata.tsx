import React from 'react';
import { JobItem } from 'types/interfaces';

type Props = {
  data: JobItem[];
  title: string;
};

export default function StatsData({ data, title }: Props) {
  return (
    <div className="data-container stats-container">
      <div className="progress-wrapper">
        <span className="progress-wrapper-header stat-header">{title}</span>
        <div className="progress-table">
          <div className="progress-row header-row">
            <div className="header-cell">
              <span>Name</span>
            </div>
            <div className="header-cell">
              <span>Available Job</span>
            </div>
            <div className="header-cell">
              <span>Skills required</span>
            </div>
          </div>
          {data.map((item) => (
            <div key={item.id} className="progress-row">
              <div className="stats-cell">
                <span>{item.name}</span>
              </div>
              <div className="stats-cell">
                <span>{item.job}</span>
              </div>
              <div className="stats-cell">
               {item.skills &&
                  item.skills.reduce<string[][]>((groups, skill, index) => {
                    const groupIndex = Math.floor(index / 3);
                    if (!groups[groupIndex]) {
                      groups[groupIndex] = [];
                    }
                    groups[groupIndex].push(skill);
                    return groups;
                  }, []).map((group, groupIndex) => (
                    <div key={groupIndex} className="outer-div">
                      <div className="group-div">
                        {group.map((skill, index) => (
                          <span key={index} className="skill-span">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
