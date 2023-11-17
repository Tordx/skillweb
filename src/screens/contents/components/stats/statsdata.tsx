import React, { useState } from 'react';
import { JobItem } from 'types/interfaces';

type Props = {
  data: JobItem[];
  title: string;
};

export default function StatsData({ data, title }: Props) {
  const initialItemsToShow = 10;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const visibleData = expanded ? data : data.slice(0, itemsToShow);

  return (
    <div className="data-container stats-container">
      <div className="progress-wrapper">
        <h4 className="progress-wrapper-header stat-header">{title}</h4>
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
          {visibleData.map((item) => (
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
      {data.length > initialItemsToShow && (
          <button className="expand-button" onClick={handleExpand}>
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        )}
    </div>
  );
}